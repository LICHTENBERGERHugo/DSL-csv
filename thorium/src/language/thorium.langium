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
    table=Table '.' name=ID '(' parameters=STRING ')' ;


hidden terminal WS: /\s+/;
terminal ID: /[_a-zA-Z][\w_]*/;
terminal INT returns number: /[0-9]+/;
terminal STRING: /"(\\.|[^"\\])*"|'(\\.|[^'\\])*'/;

hidden terminal ML_COMMENT: /\/\*[\s\S]*?\*\//;
hidden terminal SL_COMMENT: /\/\/[^\n\r]*/;
