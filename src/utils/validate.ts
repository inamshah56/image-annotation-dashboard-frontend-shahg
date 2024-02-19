export const validateImageName = (imageName: string): string => {
  let error: string = "";

  if (imageName) {
    if (
      imageName.split("_").length !== 6 ||
      !/^\d+[^\/]*.jpg$/.test(imageName)
    ) {
      error = "Please enter a valid image name";
    }
  } else {
    error = "Image name is required";
  }

  return error;
};

export const validateAddCropCondition = (data: CropConditions): Errors => {
  let newErrors: Errors = {};
  const { cropname, condition } = data;
  const min = 3;
  const max = 25;

  if (!cropname) {
    newErrors.cropname = "Crop name cannot be empty";
  } else if (cropname.length < min || cropname.length > max) {
    newErrors.cropname = "Crop name should be between 3 and 25 characters long";
  }

  if (!condition) {
    newErrors.condition = "Condition cannot be empty";
  } else if (condition.length < min || condition.length > max) {
    newErrors.condition =
      "Condition should be between 3 and 25 characters long";
  }

  return newErrors;
};

export const validateGetCropCondition = (cropname: cropname): Errors => {
  let newErrors: Errors = {};
  const min = 3;
  const max = 25;

  if (!cropname) {
    newErrors.cropname = "Crop name cannot be empty";
  } else if (cropname.length < min || cropname.length > max) {
    newErrors.cropname = "Crop name should be between 3 and 25 characters long";
  }

  return newErrors;
};

export const validateGetCropPreventions = (condition: string): Errors => {
  let newErrors: Errors = {};
  const min = 3;
  const max = 25;

  if (!condition) {
    newErrors.condition = "Condition cannot be empty";
  } else if (condition.length < min || condition.length > max) {
    newErrors.condition =
      "Condition should be between 3 and 25 characters long";
  }

  return newErrors;
};

export const validateAddCropPrevention = (data: CropPreventions): Errors => {
  let newErrors: Errors = {};
  const { condition, formula } = data;

  if (!condition) {
    newErrors.condition = "Condition cannot be empty";
  }
  if (!formula) {
    newErrors.formula = "Formula cannot be empty";
  }

  return newErrors;
};
