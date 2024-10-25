import db from "./db";
// import chalk from 'chalk';

export function formatToTimeAgo(date: string): string {
  const dayInMs = 1000 * 60 * 60 * 24;
  const time = new Date(date).getTime();
  const now = new Date().getTime();
  const diff = Math.round((time - now) / dayInMs);
  const formatter = new Intl.RelativeTimeFormat("ko");
  return formatter.format(diff, "days");
}
export function formatToWon(price: number): string {
  return price.toLocaleString("ko-KR");
}

export async function getIsOwner(userId: number) {
  // const session = await getSession();
  // if (session.id) {
  //   return session.id === userId;
  // }
  return false;
}

export async function getProduct(id: number) {
  // fetch("https://api.com", {
  //   next: {
  //     revalidate: 60,
  //     tags: ["hello"],
  //   },
  // });
  const product = await db.product.findUnique({
    where: {
      id,
    },
    include: {
      user: {
        select: {
          username: true,
          avatar: true,
        },
      },
    },
  });
  return product;
}

// export const setQueryLog = (
//   roll: string,
//   caller: string,
//   result?: object | number | string | null,
// ) => {
//   if (process.env.NODE_ENV !== 'production') {
//     db.$on('query', (e) => {
//       // SQL 키워드 자동 개행 및 색상 부여
//       const query = e.query
//         .toString()
//         .replace(
//           /(SELECT|UPDATE|DELETE|FROM|JOIN ON|WHERE|GROUP BY|HAVING|ORDER BY|LIMIT|OFFSET)\b/g,
//           '\n\x1b[35m$1\x1b[0m',
//         )
//         .replace(/(DESC|ASC)\b/g, '\x1b[35m$1\x1b[0m')
//         .replace(/,/g, '\n')
//         .replaceAll('`', '');

//       console.log(chalk.black(chalk.bgCyan(` ❖ caller: ${caller} `)));
//       console.log(chalk.black(chalk.bgCyan(` ❖ roll: ${roll} `)));
//       console.log(`${chalk.cyan('Query: ')}${query}`);
//       console.log(`${chalk.blue('Params: ')}${e.params}`);
//       console.log(
//         `${chalk.yellow('Duration: ')}${e.duration}ms ${e.duration >= 2 ? chalk.red('Too Lazy') : chalk.green('Good')}`,
//       );
//       result && console.log(`${chalk.cyan('Result:')}`);
//       result && console.log(result);
//       console.log(chalk.black(chalk.bgCyan(` ❖ DONE! ❖ `)));
//     });
//   }
// };
