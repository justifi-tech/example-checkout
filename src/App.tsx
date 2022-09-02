import { useState } from 'react';
import './App.css';
import CheckoutForm from './CheckoutForm/CheckoutForm';
import SandboxForm from './SandboxForm/SandboxForm';
import { SandboxParams } from './SandboxForm/SandboxParams';

function App() {
  const [params, setParams] = useState<SandboxParams>({
    amount: 1599,
    description: 'Wood fire pizza'
  });

  return (
    <div className={'layout-container'}>
      <div className={'layout-sidebar'}>
        <SandboxForm setParams={setParams} />
      </div>
      <CheckoutForm params={params} />
    </div>
  );
}

export default App;
