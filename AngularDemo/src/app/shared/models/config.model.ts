export interface ConfigModel {
  title?: string;
  header?: string;
  footer?: string;
  apiUrl?: string;
  auth?: {
    api?: string,
    login?: string,
    refreshToken?: string,
  };
  logger?: {
    api?: string,
    log?: string
  },
  maintenance?: {
    systemVariable: {
      api?: string,
      getPaged?: string,
      onAdd?: string,
      onEdit?: string,
      onDelete?: string,
    },
    comboBox: {
      api?: string,
      getPaged?: string,
      onAdd?: string,
      onEdit?: string,
      onDelete?: string,
    }
  }
}
