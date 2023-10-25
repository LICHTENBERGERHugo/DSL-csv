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
    Filter|Add|Modify|Project|Delete|Print|Computation;
FunctionName:
    'filter' name=STRING|'add'|'modify'|'project'|'delete'|'print';
Filter:
    '.filter(' parameters= FilterParams ')';

FilterParams:
    /* TODO implement rule */ conditions=Condition+;
Add:
    '.add(' parameters= AddParams ')';

AddParams:
    /* TODO implement rule */ {infer AddParams};
Delete:
    '.delete(' parameters= DeleteParams ')';

DeleteParams:
    /* TODO implement rule */ {infer DeleteParams};

Project:
    '.project(' parameters= ProjectParams ')';

ProjectParams:
    /* TODO implement rule */ {infer ProjectParams};
Print:
    '.print(' parameters= PrintParams ')';

PrintParams:
    /* TODO implement rule */ {infer PrintParams};
Modify:
    '.modify(' parameters= ModifyParams ')';

ModifyParams:
    /* TODO implement rule */ {infer ModifyParams};

Condition:
    rowname= STRING argument=COMPARATOR value=INT;
Computation: 
    '.compute(' agg=AGGREGATOR ',' cname=STRING ')';

    




hidden terminal WS: /\s+/;
terminal AGGREGATOR: /(SUM|COUNT)/;
terminal COMPARATOR: /(=|>|<|<=|>=)/;
terminal ID: /[_a-zA-Z][\w_]*/;
terminal INT returns number: /[0-9]+/;
terminal STRING: /"(\\.|[^"\\])*"|'(\\.|[^'\\])*'/;

hidden terminal ML_COMMENT: /\/\*[\s\S]*?\*\//;
hidden terminal SL_COMMENT: /\/\/[^\n\r]*/;
