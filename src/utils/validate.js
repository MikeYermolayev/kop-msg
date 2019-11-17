export function validate(input, label, getErrorMsg, successMsg) {
    const errorMsg = getErrorMsg(input.value);

    if (errorMsg) {
        input.parentNode.classList.add('field__error');
        label.innerText = errorMsg;

        return false;
    } else {
        input.parentNode.classList.remove('field__error');
        label.innerText = successMsg;
        return true;
    }
}
