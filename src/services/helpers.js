import withQuery from "with-query";

export const checkErrors = (response) => {
  if (response.data.hasOwnProperty("error")) {
    console.log(response.data.error);
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
      object[item.name] = item.value.trim();
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

// Funciona com o getStaticProps
export const getData = async (url, param = null) => {
  const res = await fetch(
    withQuery(process.env.NEXT_PUBLIC_SERVER_URL + url, param)
  ).then((res) => res.json());
  return res;
};
