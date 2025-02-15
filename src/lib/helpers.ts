export async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

type ISomeType = { [key: string]: unknown };
type mapValueOptionType = {
  exec?: boolean;
};
export function mapValue(
  value: keyof ISomeType,
  map: ISomeType,
  options: mapValueOptionType = {}
) {
  options.exec = options.hasOwnProperty("exec") ? options.exec : true;

  const ret = map[value] || false;

  if (ret === false) return ret;

  if (typeof ret === "function") return options.exec ? ret(value) : ret;

  return ret;
}

const dbgStyles = (dbgColor: string) =>
  `background-color: ${dbgColor}; color: #fff; padding: 1px 3px; border-radius: 5px;`;

export const dbg = {
  error: function (props) {
    // if(arguments.length === 1) {
    //   label = 'error';
    // }
    console.log("%cerror", dbgStyles("#f00"), props);
  },
  // success: function (label, ...props) {
  //   // if(arguments.length === 1) {
  //   //   label = 'success';
  //   // }
  //   console.log("%c" + label, dbgStyles("#0a0"), ...props);
  // },
  // warn: function (label, ...props) {
  //   // if(arguments.length === 1) {
  //   //   label = 'warn';
  //   // }
  //   console.log("%c" + label, dbgStyles("#f60"), ...props);
  // },
  info: function (props) {
    // if(arguments.length === 1) {
    //   label = 'info';
    // }
    console.log("%cinfo", dbgStyles("#0288d1"), props);
  },
  // primary: function (label, ...props) {
  //   console.log("%c" + label, dbgStyles("#1976d2"), ...props);
  // },
  // secondary: function (label, ...props) {
  //   console.log("%c" + label, dbgStyles("#777"), ...props);
  // },
  // debug: function (label, ...props) {
  //   console.log("%c" + label, dbgStyles("#9100bf"), ...props);
  // },
};
