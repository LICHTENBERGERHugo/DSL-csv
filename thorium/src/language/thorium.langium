grammar Thorium

entry Model:
    lines+=Line*;

Line:
    (declaration=Declaration | function=ThoriumFunction);

Declaration:
    'let' name=ID '=' DataSource;

DataSource:
    CSVFile|Table;

CSVFile:
    'CSVFile(' filepath=STRING ')'|csvName=ID;
Table:
    'Table(' file=CSVFile ')'|name=ID;

ThoriumFunction:
    table=Table ftype=FunctionType;
FunctionType:
    Filter|Add|Modify|Project|Delete|Print|Computation|Write;

Write:
    '.write(' location=STRING ')';

Filter:
    '.filter(' parameters=FilterParams ')';

FilterParams:
    conditions=ConditionArray|condition=Condition;

Condition:
    rowname=STRING argument=COMPARATOR value=(STRING|INT);

ConditionArray:
    '[' '(' con1=Condition ')' (',' '(' other+=Condition ')')* ']';

Add:
    '.add(' parameters=AddParams ')';

AddParams:
    rows=CSVRowArray|row=CSVRow;

CSVRowArray:
    '[' (rows+=CSVRow (',' rows+=CSVRow)*)? ']';
CSVRow:
    text=STRING;
Delete:
    '.delete(' parameters=DeleteParams ')';

DeleteParams:
    DeleteParamInt | DeleteParamString | DeleteParamArrayInt | 
    DeleteParamArrayString;

DeleteParamInt:
    row=INT;
DeleteParamString:
    col=STRING;
DeleteParamArrayInt:
    '[' (rows+=INT (',' rows+=INT)*)? ']';
DeleteParamArrayString:
    '[' (cols+=STRING (',' cols+=STRING)*)? ']';


Project:
    '.project(' parameters=ProjectParams ')';

ProjectParams:
    col=STRING |'[' col=STRING (',' other+=STRING )* ']';

Print:
    v='.print()'; //'.print(' (columns+= STRING+)* ')';

Modify:
    '.modify(' parameters=ModifyParams ')';

ModifyParams:
    (rowID=INT ',' value=CSVRow)|(rowID=INT','colID=(INT|STRING)','value=(STRING|INT));

Computation:
    '.compute(' agg=AGGREGATOR (',' cname=STRING)? ')';

hidden terminal WS: /\s+/;
terminal AGGREGATOR: /(SUM|COUNT)/;
terminal COMPARATOR: /(==|>=|<=|>|<)/;
terminal ID: /[_a-zA-Z][\w_]*/;
terminal INT returns number: /[0-9]+/;
terminal STRING: /"(\\.|[^"\\])*"|'(\\.|[^'\\])*'/;

hidden terminal ML_COMMENT: /\/\*[\s\S]*?\*\//;
hidden terminal SL_COMMENT: /\/\/[^\n\r]*/;
