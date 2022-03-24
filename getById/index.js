module.exports = async function (context, req) {
  if (!context.bindings.document) {
    context.res = { status: 404 };
    return;
  }
  context.res = {
    body: context.bindings.document,
  };
};
