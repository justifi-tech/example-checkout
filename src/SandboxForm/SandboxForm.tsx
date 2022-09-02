import { useForm } from 'react-hook-form';

// import { SandboxParams } from "./SandboxParams";
import FormField from '../Shared/FormField';

function SandboxForm(props: { setParams: any }) {
  const { setParams } = props;
  const { register, handleSubmit } = useForm();

  function onSubmit(values: any) {
    setParams(values);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid">
      <div className="row">
        <div className="column">
          <legend>Checkout Params</legend>
        </div>
      </div>
      <div className="row">
        <div className="column">
          <FormField
            name="amount"
            label={'Amount'}
            register={register}
            rules={{ required: true }}
          />
        </div>
      </div>
      <div className="row">
        <div className="column">
          <FormField
            name="description"
            label={'Description'}
            register={register}
            rules={{ required: true }}
          />
        </div>
      </div>
      <div className="row">
        <div className="column">
          <button type="submit" className="button">Apply</button>
        </div>
      </div>
    </form>
  );
}

export default SandboxForm;
