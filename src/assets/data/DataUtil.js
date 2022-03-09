export const errMsg = {
  errCode: "E0001--01",
  errStr: "Occurred Error",
};

export const integratedFetch = (data) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      return resolve(data);
    }, 1000);

    if (false) {
      return reject(errMsg);
    }
  });
};
