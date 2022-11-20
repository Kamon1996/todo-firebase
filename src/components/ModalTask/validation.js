export const validate = (form) => {
  const errors = {};
  if (!form.title.trim()) {
    errors["title"] = `can't be empty`;
  }
  if (!form.completeDate) {
    errors["date"] = `can't be empty`;
  }
  if (Date.parse(form.completeDate) < new Date()) {
    errors["date"] = `can't be in the past`;
  }
  return errors;
};
