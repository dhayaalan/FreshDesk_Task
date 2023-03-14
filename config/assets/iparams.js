let getauthvalues = (authInfo) => {
  var url = authInfo.fs_domain + '';
  var headers = {
    Authorization: btoa(authInfo.fs_key),
  };
  console.log(url, headers);
  return client.request.get(url, { headers });
};
