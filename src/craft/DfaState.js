 const DfaState = {
  Initial:"Initial",

  If:"If",
  Id_if1:"Id_if1",
  Id_if2:'Id_if2',
  Else:'Else',
  Id_else1:'Id_else1',
  // Id_else2,
  // Id_else3,
  // Id_else4,
  Int:'Int',
  Id_int1:'Id_int1',
  Id_int2:'Id_int2',
  Id_int3:'Id_int3',
  Id:'Id',
  GT:'GT',
  GE:'GE',

  Assignment:"Assignment",

  Plus:"Plus",
  Minus:"Minus",
  Star:"Star",
  Slash:"Slash",

  SemiColon:"SemiColon",
  LeftParen:"LeftParen",
  RightParen:"RightParen",

  IntLiteral:"IntLiteral",
};
module.exports={
  DfaState:DfaState
}