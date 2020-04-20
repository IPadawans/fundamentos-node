import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;

  value: number;

  type: 'income' | 'outcome';
}
class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    switch (type) {
      case 'income': {
        const transaction = this.transactionsRepository.create({
          title,
          value,
          type,
        });

        return transaction;
      }

      case 'outcome': {
        const balance = this.transactionsRepository.getBalance();
        if (balance.total - value < 0) {
          throw Error('Value exceed your total in balance');
        }
        const transaction = this.transactionsRepository.create({
          title,
          value,
          type,
        });

        return transaction;
      }

      default:
        throw Error('Informed type must be income or outcome');
    }
  }
}

export default CreateTransactionService;
