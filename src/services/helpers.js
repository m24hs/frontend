export const checkErrors = (response) => {
    if (response.data.hasOwnProperty('error')) {
        console.log(response.data.error);
        return true;
    }
    return false;
};

export const capitalize = (str) => {
    return (str.length > 0 ? str.toLowerCase().split(' ').map(word => {
        return word[0].toUpperCase() + word.substr(1);
    }).join(' ') : '');
};

export const fetchData = async (result) =>
  await result.then((res) => ({
      error: false,
      data: res.data,
    }))
    .catch(() => ({
      error: true,
      data: null,
    }));

export const getFormData = (formName) => {
    const form = document.querySelectorAll(formName+' input, '+formName+' select, '+formName+' textarea, '+formName+' checkbox');
    let object = {};
    [].forEach.call(form, function(item) {
      if (item.hasAttribute('name')) {
        object[item.name] = item.value;
      }
    });
    return object;
}