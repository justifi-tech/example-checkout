import FormField from '../Shared/FormField';

enum FormFieldLabels {
  name = 'Name',
  address_city = 'City',
  address_country = 'Country',
  address_line1 = 'Street Address',
  address_state = 'State',
  address_postal_code = 'Zip'
}

function BillingForm(props: { errors: any, register: any }) {
  const { errors, register } = props;

  return (
    <>
      <div className="row">
        <div className="column">
          <FormField
            errors={errors}
            name="name"
            label={FormFieldLabels.name}
            register={register}
            rules={{ required: true }}
          />
        </div>
      </div>

      <div className="row">
        <div className="column">
          <FormField
            errors={errors}
            name="address_line1"
            label={FormFieldLabels.address_line1}
            register={register}
            rules={{ required: true }}
          />
        </div>
      </div>

      <div className="row">
        <div className="column">
          <FormField
            errors={errors}
            name="address_city"
            label={FormFieldLabels.address_city}
            register={register}
            rules={{ required: true }}
          />
        </div>
      </div>

      <div className="row">
        <div className="column">
          <FormField
            errors={errors}
            name="address_state"
            label={FormFieldLabels.address_state}
            register={register}
            rules={{ required: true }}
          />
        </div>
        <div className="column col-4">
          <FormField
            errors={errors}
            name="address_postal_code"
            label={FormFieldLabels.address_postal_code}
            register={register}
            rules={{ required: true }}
          />
        </div>
      </div>

      <div className="row">
        <div className="column">
          <FormField
            errors={errors}
            name="address_country"
            label={FormFieldLabels.address_country}
            register={register}
            rules={{ required: true }}
          />
        </div>
      </div>
    </>
  );
}

export default BillingForm;
