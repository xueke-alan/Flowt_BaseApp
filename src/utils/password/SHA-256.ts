import crypto from 'crypto-js/crypto-js';

import random from 'string-random';

export function generateRandomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function HashPasswordBySHA256(
  password: string,
  salt: string = random(32),
  saltRounds: number = generateRandomNumber(4000, 6000)
) {
  const startTime = performance.now(); // 记录开始时间
  // const hashedPassword = sha256(password);
  const hashPassword = crypto
    .PBKDF2(password, salt, {
      keySize: 8,
      iterations: 5714,
    })
    .toString(crypto.enc.Hex);

  const endTime = performance.now(); // 记录结束时间
  const executionTime = endTime - startTime; // 计算代码执行毫秒数
  console.log(executionTime + 'ms');
  return { salt, saltRounds, hashPassword };
}
