export function mapBankArr(bankArr: any[], menuIndex: string) {
  return menuIndex === '1' ? bankArr : bankArr.filter((item) => item.type === menuIndex)
}
