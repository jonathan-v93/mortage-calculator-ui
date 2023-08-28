export enum ErrorMessageEnum {
  MoreThanZero = "Property price must be greater than 0.",
  MortgageLength = "Length of mortgage must be a multiple of 5 and between 5 and 30 years.",
  DownPaymentInsufficient = "Down payment not sufficient, it must be more than or equal to 10% of property price",
  InterestInvalid = "Annual Interest rate should be a decimal greater than 0 and less than 1.",
}
