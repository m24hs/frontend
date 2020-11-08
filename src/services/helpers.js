export const checkErrors = (response) => {
  if (response.data.hasOwnProperty("error")) {
    return true;
  }
  return false;
};

export const capitalize = (str) => {
  return str.length > 0
    ? str
        .toLowerCase()
        .split(" ")
        .map((word) => {
          return word[0].toUpperCase() + word.substr(1);
        })
        .join(" ")
    : "";
};

export const fetchData = async (result) =>
  await result.then((res) => res.data).catch(() => ({}));

export const getFormData = (formName) => {
  const form = document.querySelectorAll(
    formName +
      " input, " +
      formName +
      " select, " +
      formName +
      " textarea, " +
      formName +
      " checkbox"
  );
  let object = {};
  [].forEach.call(form, function (item) {
    if (item.hasAttribute("name")) {
      if (item.type === "file") {
        object[item.name] = item.files[0];
      } else {
        object[item.name] = item.value.trim();
      }
    }
  });
  return object;
};

export const countError = (formName) => {
  let promise = new Promise((resolve, reject) => {
    // Seleciona components
    const formComponents = document.querySelectorAll(
      `${formName} .form-component, ${formName} .form-component * `
    );
    // For each
    [].forEach.call(formComponents, function (item, index) {
      item.focus();
      if (index === formComponents.length - 1) resolve();
    });
  });

  // Retorna
  return promise.then(() => {
    // Verifica errors
    const formErrors = document.querySelectorAll(formName + " .form-error ");
    return formErrors.length;
  });
};

export const getBrowser = () => {
  var ua = navigator.userAgent;
  if (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(
      ua
    )
  )
    return "mobile";
  else if (/Chrome/i.test(ua)) return "chrome";
  else return "desktop";
};

// Valida email
export const validateEmail = (email) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};
