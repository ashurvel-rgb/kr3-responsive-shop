function validateAndSubmit(form, successMessage, onSuccess) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formElements = Array.from(form.elements);

    formElements.forEach((element) => {
      if (element.willValidate) {
        element.removeAttribute('aria-invalid');
      }
    });

    if (!form.checkValidity()) {
      formElements.forEach((element) => {
        if (element.willValidate && !element.checkValidity()) {
          element.setAttribute('aria-invalid', 'true');
        }
      });

      form.reportValidity();
      return;
    }

    successMessage.hidden = false;
    form.reset();

    if (onSuccess) {
      onSuccess();
    }
  });
}

const orderDialog = document.getElementById('order-dialog');
const orderButtons = document.querySelectorAll('.product-card__button[data-product]');
const closeDialogButton = document.getElementById('close-order-dialog');
const selectedProductInput = document.getElementById('selected-product');
const modalOrderForm = document.getElementById('order-form');
const modalSuccessMessage = document.getElementById('success-message');

if (
  orderDialog
  && closeDialogButton
  && selectedProductInput
  && modalOrderForm
  && modalSuccessMessage
) {
  orderButtons.forEach((button) => {
    button.addEventListener('click', () => {
      selectedProductInput.value = button.dataset.product;
      modalSuccessMessage.hidden = true;
      orderDialog.showModal();
    });
  });

  closeDialogButton.addEventListener('click', () => {
    orderDialog.close();
  });

  validateAndSubmit(modalOrderForm, modalSuccessMessage, () => {
    orderDialog.close();
  });
}

const pageOrderForm = document.getElementById('page-order-form');
const pageSuccessMessage = document.getElementById('page-success-message');

if (pageOrderForm && pageSuccessMessage) {
  const productSelect = document.getElementById('page-order-product');
  const productFromUrl = new URLSearchParams(window.location.search).get('product');

  if (productSelect && productFromUrl) {
    productSelect.value = productFromUrl;
  }

  validateAndSubmit(pageOrderForm, pageSuccessMessage);
}
