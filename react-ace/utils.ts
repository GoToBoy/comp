export function detectStatementType(statement: string) {
  // MySQL 查询语句通常以 SELECT、INSERT、UPDATE、DELETE 等关键词开头
  const mysqlRegex = /^(SELECT|INSERT|UPDATE|DELETE|CREATE|ALTER|DROP|SHOW|DESCRIBE)\s+/i;

  // FreeMarker 通常包含 <# 开头的指令
  const freemarkerRegex = /<#[a-zA-Z]+/;

  // JavaScript 代码通常不具备特定的规则，但可以尝试检测关键字或函数名
  const javascriptRegex =
    /\bfunction\b|\bif\b|\belse\b|\bfor\b|\bwhile\b|\bconst\b|\blet\b|\bvar\b/;

  // JSON 语法通常以 { 开头
  const jsonRegex = /^\s*\{/;

  if (mysqlRegex.test(statement)) {
    return 'mysql';
  } else if (freemarkerRegex.test(statement)) {
    return 'freemarker';
  } else if (javascriptRegex.test(statement)) {
    return 'javascript';
  } else if (jsonRegex.test(statement)) {
    return 'json';
  }

  return 'freemarker'; // default java
}
