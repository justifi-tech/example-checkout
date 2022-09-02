import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { JustiFiPaymentsJSArgs } from '../Justifi/justifi-types';
import Api from '../Api/Api';
import Payment from '../Api/Payment';
import CheckoutFormHeader from './CheckoutFormHeader';
import BillingForm from './BillingForm';
import FormFieldError, { FormFieldErrorTypes } from '../Shared/FormFieldError';
import { SandboxParams } from '../SandboxForm/SandboxParams';
import { getConfig } from '../config';

const { clientId, sellerAccountId } = getConfig();

const JustiFiPaymentsJSConfig: JustiFiPaymentsJSArgs = {
  clientKey: clientId,
  theme: 'white',
  account: sellerAccountId
}

const JustifiJS = (window as any).JustiFiPaymentsJS(JustiFiPaymentsJSConfig);

function CheckoutForm(props: { params: SandboxParams }) {
  const { params } = props;
  const api = Api();
  const [showCardFormErrors, setShowCardFormErrors] = useState<boolean>(false);
  const [cardFormErrors, setCardFormErrors] = useState<string[]>();
  const [submitting, setSubmitting] = useState<boolean>();
  const { register, handleSubmit, formState: { errors } } = useForm();

  useEffect(() => {
    JustifiJS.appendTo('#card-form');
    JustifiJS.on('ready', (data: any) => {
      // You can use the 'ready' event to set your app's loading state
      // so that the card field does not 'pop in'
      console.log('ready!');

      // You can also use the 'ready' event to retrieve initial errors,
      // which can then be shown if the form is submitted prematurely
      setCardFormErrors(data.errors);
    })
    JustifiJS.on('change', (data: any) => { setCardFormErrors(data.errors); });
  }, []);

  async function onSubmitValidForm(formValues: any) {
    setShowCardFormErrors(true);
    if (submitting || cardFormErrors?.length) return;

    setSubmitting(true);

    const tokenizeResponse = await JustifiJS.tokenize({
      ...formValues
    });

    if (tokenizeResponse.token) {
      const payment = new Payment({
        amount: params.amount,
        description: params.description,
        payment_method: { token: tokenizeResponse.token }
      });

      const paymentRequest = await api.submitPayment(payment);
      setSubmitting(false);
      alert('Payment created: \n' + JSON.stringify(paymentRequest.data));
    } else {
      setSubmitting(false);
      alert('Tokenization error: \n' + tokenizeResponse.errors[0]);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmitValidForm, () => setShowCardFormErrors(true))} className="checkout-container">
      <CheckoutFormHeader amount={params.amount} description={params.description} />
      <section>
        <div className="grid">
          <BillingForm errors={errors} register={register} />

          <div className="row">
            <div className="column">
              <div id="card-form"></div>
              {(showCardFormErrors && cardFormErrors?.length) ? (
                <FormFieldError label={'Credit Card'} errorType={FormFieldErrorTypes.invalid} />
              ) : ''}
            </div>
          </div>
        </div>
      </section>
      <footer className="grid">
        <div className="row">
          <div className="column">
            <button
              type="submit"
              className="button--full-width"
              disabled={submitting}>
              {submitting ? 'Submitting...' : 'Pay'}
            </button>
          </div>
        </div>
      </footer>
    </form>
  );
}

export default CheckoutForm;
