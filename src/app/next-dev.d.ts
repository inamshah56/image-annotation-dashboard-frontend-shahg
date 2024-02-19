type TitleProp = string;

interface ButtonProps {
  title: TitleProp;
  disabled: boolean;
}

interface Errors {
  cropname?: string;
  condition?: string;
  imageName?: string;
  cropStatus?: string;
  fieldStatus?: string;
  formula?: string;
}

type cropname = string;

interface CropConditions {
  cropname: string;
  condition: string;
}

interface CropDetails {
  date: string;
  farmId: string;
  cropVariety: string;
  cropname: string;
  cropStage: string;
  cropAge: string;
}

interface ProcessedResult {
  count: number;
  img_column: string;
  id: string;
  result?: string | null;
  overall_result?: string | boolean;
  annotated?: boolean;
  img1_annotation?: string;
  img2_annotation?: string;
  img3_annotation?: string;
  img4_annotation?: string;
  img5_annotation?: string;
}

interface PreviousResults {
  image1: string;
  image2: string;
  image3: string;
  image4: string;
  image5: string;
}

interface Conditions {
  value: string;
  label: string;
}

interface CropPreventions {
  id?: number;
  condition: string;
  severity: string;
  prevention_eng: string;
  prevention_urdu: string;
  formula: string;
  chemical_control_eng: string;
  chemical_control_urdu: string;
}

interface Status {
  code: number | null;
  message: string;
}

interface History {
  average_prediction: string;
  img_date: string;
}

type DeletePrevention = (id) => Promise<void>;

interface AppData {
  loading: boolean;
  startLoading: () => void;
  stopLoading: () => void;
  errors: Errors;
  updateErrors: (newErrors: Partial<Errors>) => void;
  updateResults: (data: any) => void;
  cropDetails: CropDetails;
  updateCropDetails: (data: Partial<CropDetails>) => void;
  processedResult: ProcessedResult;
  updateProcessedResult: (data: Partial<ProcessedResult>) => void;
  previousResults: PreviousResults;
  updatePreviousResults: (data: Partial<PreviousResults>) => void;
  cropConditions: Conditions[];
  updateCropConditions: (data: Partial<CropCondition>[]) => void;
  status: Status;
  updateStatus;
  resetStatus;
  closeAlert;
  resetContext;
}
