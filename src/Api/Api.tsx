import Payment from './Payment';
import { getConfig } from '../config';

export interface IApiResponse<T> {
  id: number,
  type: string,
  data: T,
  has_more: boolean
}

const Api = () => {
  const { serverDomain } = getConfig();

  async function submitPayment(payment: Payment) {
    try {
      const response = await fetch(`${serverDomain}/payment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payment)
      });
      return response.json();
    } catch {
      console.error('Error submitting payment');
    }
  };

  return { submitPayment };
};


export default Api;
