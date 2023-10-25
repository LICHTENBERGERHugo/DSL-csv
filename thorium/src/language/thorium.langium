grammar Thorium

entry Model:
    (declarations+=Declaration+ | functions+=ThoriumFunction+)*;

Declaration: 
    'let' name=ID '=' DataSource;

DataSource: 
    CSVFile|Table;

CSVFile: 
    'CSVFile(' filepath=STRING ')'|name=ID;
Table:
    'Table(' file=CSVFile ')'|name=ID;
ThoriumFunction: 
    table=Table FunctionType ;
FunctionType:
    Filter|Add|Modify|Project|Delete|Print;
FunctionName:
    'filter' name=STRING|'add'|'modify'|'project'|'delete'|'print';
Filter:
    table=Table '.filter(' parameters= FilterParams ')';

// FilterParams:
//     /* TODO implement rule */ conditions=Condition+;
FilterParams:
    conditions=ConditionArray|condition=Condition;
ConditionArray:
    '[' condlist=(Condition ((',' Condition)+)*)* ']';
Add:
    table=Table '.add(' parameters= AddParams ')';

AddParams:
    /* TODO implement rule */ {infer AddParams};
Delete:
    table=Table '.delete(' parameters= DeleteParams ')';

DeleteParams:
    /* TODO implement rule */ {infer DeleteParams};

Project:
    table=Table '.project(' parameters= ProjectParams ')';

ProjectParams:
    /* TODO implement rule */ {infer ProjectParams};
Print:
    table=Table '.print(' parameters= PrintParams ')';

PrintParams:
    /* TODO implement rule */ {infer PrintParams};
Modify:
    table=Table '.Modify(' parameters= ModifyParams ')';

ModifyParams:
    /* TODO implement rule */ {infer ModifyParams};

Condition:
    rowname= STRING argument=COMPARATOR value=INT;




hidden terminal WS: /\s+/;
terminal COMPARATOR: /(=|>|<|<=|>=)/;
terminal ID: /[_a-zA-Z][\w_]*/;
terminal INT returns number: /[0-9]+/;
terminal STRING: /"(\\.|[^"\\])*"|'(\\.|[^'\\])*'/;

hidden terminal ML_COMMENT: /\/\*[\s\S]*?\*\//;
hidden terminal SL_COMMENT: /\/\/[^\n\r]*/;
