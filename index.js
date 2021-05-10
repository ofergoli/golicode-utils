const searchVariableDeclaration = (program, varName) => {
    const vars = program.body.filter(
        ({ type }) => type === "VariableDeclaration"
    );
    if (vars.length === 0) {
        return false;
    }
    const variable = vars.find(
        ({ declarations }) => declarations[0].id.name === varName
    );
    if (!variable) {
        return null;
    }
    if (variable.declarations[0].init.operator === '-') {
        return -variable.declarations[0].init.argument.value;
    }
    return variable.declarations[0].init.value;
};

const isVariableDeclared = (program, varName) => {
    const vars = program.body.filter(
        ({ type }) => type === "VariableDeclaration"
    );
    if (vars.length === 0) {
        return false;
    }
    const variable = vars.find(
        ({ declarations }) => declarations[0].id.name === varName
    );
    return !!variable;
};

const isIncludeLoop = (program) => program.body.some(({ type }) => type === "WhileStatement" || type === "ForStatement")

const countVariableDeclaration = (program) => {
    const vars = program.body.filter(
        ({ type }) => type === "VariableDeclaration"
    );
    return vars.length;
};

const searchAnyVariableDeclaration = (program) => {
    const vars = program.body.filter(
        ({ type }) => type === "VariableDeclaration"
    );
    if (vars.length === 0) {
        return false;
    }
    return vars[0].declarations[0].init.value;
};

const searchVariableByOrderDeclaration = (program, order) => {
    const vars = program.body.filter(
        ({ type }) => type === "VariableDeclaration"
    );
    return vars[order].declarations[0].init.value;
};

const searchVarableByOrderDeclaration = (program, order) => {
    const vars = program.body.filter(
        ({ type }) => type === "VariableDeclaration"
    );
    if (vars.length <= order) {
        return false;
    }
    let variableDeclaration = vars[order];
    if (
        variableDeclaration.declarations &&
        variableDeclaration.declarations[0] &&
        variableDeclaration.declarations[0].init
    ) {
        return variableDeclaration.declarations[0].init.value;
    }
    let variableDeclarationName = null;
    if (
        vars[order].declarations &&
        vars[order].declarations[0] &&
        vars[order].declarations[0].id
    ) {
        variableDeclarationName = vars[order].declarations[0].id.name;
    }
    const varsExpressionStatement = program.body.filter(
        ({ type }) => type === "ExpressionStatement"
    );
    const expressionStatementValue = varsExpressionStatement.find(
        ({
            expression: {
                left: { name }
            }
        }) => name === variableDeclarationName
    );
    if (!expressionStatementValue) {
        return undefined;
    }
    const {
        expression: {
            right: { value }
        }
    } = expressionStatementValue;
    return value;
};


var array = ['abs', 'aba', 'abba', 'seerees', 'wqgw', 'egeve', 'vvdddbbdddvv', 'vav', 'asdf', 'saas'];



const searchVarableByNameDeclaration = (program, varName) => {
    const foundedVar = program.body.filter(
        ({ type }) => type === "VariableDeclaration"
    ).find(x => x.declarations[0].id.name === varName);
    if (!foundedVar) {
        return false;
    }
    let variableDeclarationName = null;
    if (
        foundedVar.declarations &&
        foundedVar.declarations[0] &&
        foundedVar.declarations[0].init
    ) {
        return foundedVar.declarations[0].init.value;
    }
    if (
        foundedVar.declarations &&
        foundedVar.declarations[0] &&
        foundedVar.declarations[0].id
    ) {
        variableDeclarationName = foundedVar.declarations[0].id.name;
    }
    const varsExpressionStatement = program.body.filter(
        ({ type }) => type === "ExpressionStatement"
    );
    const expressionStatementValue = varsExpressionStatement.find(
        ({
            expression: {
                left: { name }
            }
        }) => name === variableDeclarationName
    );
    if (!expressionStatementValue) {
        return undefined;
    }
    const {
        expression: {
            right: { value }
        }
    } = expressionStatementValue;
    return value;
};



const searchAndFetchVarableByNameDeclaration = (program, varName) => {
    const foundedVar = program.body.filter(
        ({ type }) => type === "VariableDeclaration"
    ).find(x => x.declarations[0].id.name === varName);
    if (!foundedVar) {
        return false;
    }
    let variableDeclarationName = null;
    if (
        foundedVar.declarations &&
        foundedVar.declarations[0] &&
        foundedVar.declarations[0].init
    ) {
        return { variable: foundedVar.declarations[0].init, value: foundedVar.declarations[0].init.value };
    }
    if (
        foundedVar.declarations &&
        foundedVar.declarations[0] &&
        foundedVar.declarations[0].id
    ) {
        variableDeclarationName = foundedVar.declarations[0].id.name;
    }
    const varsExpressionStatement = program.body.filter(
        ({ type }) => type === "ExpressionStatement"
    );
    const expressionStatementValue = varsExpressionStatement.find(
        ({
            expression: {
                left: { name }
            }
        }) => name === variableDeclarationName
    );
    if (!expressionStatementValue) {
        return undefined;
    }
    const {
        expression: {
            right: { value }
        }
    } = expressionStatementValue;
    return { variable: expressionStatementValue.expression.right, value };
};

const includeWhileOrForLoop = body => body.some(({ type }) => type === "WhileStatement" || type === "ForStatement");

const countLoops = program => {
    const forOrWhile = program.body.filter(({ type }) => type === "WhileStatement" || type === "ForStatement");
    return forOrWhile.length;
}

const isNestedLoops = (program) => {
    const forOrWhile = program.body.filter(
        ({ type }) => type === "WhileStatement" || type === "ForStatement"
    );
    if (forOrWhile.length === 0) {
        return false;
    }
    return forOrWhile[0].body.body.some(({ type }) => type === "WhileStatement" || type === "ForStatement");
};

const searchVaiableAssinementExpression = (program, varName) => {
    const vars = program.body.filter(
        ({ type }) => type === "ExpressionStatement"
    );
    const value = vars.find(
        ({ expression }) =>
            expression && expression.left && expression.left.name === varName
    );
    if (!value) {
        return false;
    }
    return (
        value.expression && value.expression.right && value.expression.right.value
    );
};

const findForLoopDeclatrion = (program, order) => {
    const forLoops = program.body.filter(({ type }) => type === "ForStatement");
    if (forLoops.length <= order) {
        return false;
    }
    const {
        init: { declarations }
    } = forLoops[order];
    const {
        init: { value: startValue }
    } = declarations[0];
    const {
        test: {
            operator,
            right: { value: endValue }
        }
    } = forLoops[order];
    return { startValue, endValue, operator, forBlock: forLoops[order] };
};

const haveForLoopDeclatrion = (program) => {
    const forLoops = program.body.filter(({ type }) => type === "ForStatement");
    return forLoops.length > 0;
};

// const searchArrayDeclatrion = (program, order) => {
//     const arrays = program.body.filter(x => x.type === "VariableDeclaration").filter(x => x.declarations[0].init.type === "ArrayExpression");
//     if (arrays.length <= order) {
//         return false;
//     }
//     const arrayValues = arrays[order].declarations[0].init.elements;
//     return arrayValues;
// }

const searchArrayDeclatrion = (program, order) => {
    const arrays = program.body.filter((x) => x.type === "VariableDeclaration");
    if (arrays.length === 0) {
        return false;
    }
    const currentArray = arrays[order];
    if (currentArray.declarations[0].init) {
        return currentArray.declarations[0].init.elements;
    }
    const arrName = currentArray.declarations[0].id.name;

    const expressionStatments = program.body.filter(
        ({ type }) => type === "ExpressionStatement"
    );
    const arrayExpressionStatement = expressionStatments.find(
        ({ expression: { left } }) => left.name === arrName
    );
    const {
        expression: {
            right: { elements }
        }
    } = arrayExpressionStatement;
    return elements;
};



const searchNameAndValuesArrayDeclatrion = (program, order) => {
    const arrays = program.body.filter(x => x.type === "VariableDeclaration").filter(x => x.declarations[0].init.type === "ArrayExpression");
    if (arrays.length <= order) {
        return false;
    }
    const arrayValues = arrays[order].declarations[0].init.elements;
    const arrayName = arrays[order].declarations[0].id.name;
    return { arrayName, arrayValues };
}


const searchArrayDeclatrionByName = (program, arrName) => {
    const array = program.body.filter(x => x.type === "VariableDeclaration").find(x => x.declarations[0].init.type === "ArrayExpression" && x.declarations[0].id.name === arrName);
    if (!array) {
        return false;
    }
    const arrayValues = array.declarations[0].init.elements;
    return arrayValues
}

const createtCodeBlockWithReturn = (ast, returnValue) => {
    const codeBlock = recast
        .print(ast.program)
        .code.replace('import "./config.js";', "");
    const codeBlockFunction = new Function(codeBlock + `return ${returnValue};`);
    return codeBlockFunction
}

const ping = (code = '') => {
    fetch(`${window.origin_url_path}/user/question-status`, {
        body: JSON.stringify({
            email: window.user_email,
            questionId: window.question_id,
            socketId: window.socket_id,
            userCode: code
        }),
        method: "post",
        headers: {
            "Content-Type": "application/json"
        }
    });
};

const sendQuestion = (body) => fetch(`${window.origin_url_path}/user/run-question-test`, {
    method: "POST",
    body: JSON.stringify({ dom: body }),
    headers: {
        "Content-Type": "application/json"
    }
});

const searchConsoleLog = (program, order) => {
    const expresstionStatements = program.body.filter(
        ({ type }) => type === "ExpressionStatement"
    );
    if (expresstionStatements.length === 0) {
        return false;
    }
    const consoleLogs = expresstionStatements.filter(
        ({
            expression: {
                callee: {
                    object: { name }
                }
            }
        }) => name === "console"
    );
    if (consoleLogs.length === 0) {
        return false;
    }
    return consoleLogs[order].expression.arguments;
};


const findForLoopDeclatrionWithNegative = (program, order) => {
    const forLoops = program.body.filter(({ type }) => type === "ForStatement");
    if (forLoops.length <= order) {
        return false;
    }
    const {
        init: { declarations }
    } = forLoops[order];

    let startValue = null;
    if (declarations[0].init.value || declarations[0].init.value === 0) {
        startValue = declarations[0].init.value;
    } else if (declarations[0].init.type === "Identifier") {
        startValue = declarations[0].init.name;
    } else if (declarations[0].init.type === "UnaryExpression") {
        startValue =
            declarations[0].init.operator + declarations[0].init.argument.name;
    } else if (declarations[0].init.type === "BinaryExpression") {
        startValue =
            declarations[0].init.left.name +
            declarations[0].init.operator +
            declarations[0].init.right.value;
    } else if (declarations[0].init.operator === "-") {
        startValue = -1 * declarations[0].init.argument.value;
    }

    let endValue = null;
    if (
        forLoops[order].test.right.value ||
        forLoops[order].test.right.value === 0
    ) {
        endValue = forLoops[order].test.right.value;
    } else if (forLoops[order].test.right.type === "Identifier") {
        endValue = forLoops[order].test.right.name;
    } else if (forLoops[order].test.right.type === "UnaryExpression") {
        endValue =
            forLoops[order].test.right.operator +
            forLoops[order].test.right.argument.name;
    } else if (forLoops[order].test.right.type === "BinaryExpression") {
        endValue =
            forLoops[order].test.right.left.name +
            forLoops[order].test.right.operator +
            forLoops[order].test.right.right.value;
    } else if (forLoops[order].test.right.operator === "-") {
        endValue = -1 * forLoops[order].test.right.argument.value;
    }

    const {
        test: { operator }
    } = forLoops[order];

    return { startValue, endValue, operator, declration: forLoops[order] };
};


const getIfStatements = (program, order) => {
    const ifs = program.body.filter(({ type }) => type === "IfStatement");
    if (ifs.length === 0 || ifs.length < order) {
        return false;
    }
    return ifs[order];
}

const getIfDeclaration = (program, order) => {
    const IfStatement = getIfStatements(program, order);
    if (!IfStatement) {
        return false;
    }
    if (!IfStatement.alternate) {
        //just if case
        return "if";
    }
    if (IfStatement.alternate && IfStatement.alternate.alternate) {
        //elseif case
        return "elseif";
    }
    if (IfStatement.alternate) {
        //just else case
        return "else";
    }
    return false;
};

const isValidElseIfDeclaration = (program, order) => {
    const ifType = getIfDeclaration(program, order);
    if (!ifType || (ifType && ifType !== "elseif")) {
        return false;
    }
    const ifStatement = getIfStatements(program, order);
    let current = ifStatement.alternate;
    while (current) {
        if (
            current.test &&
            current.test.operator &&
            current.test.operator === "="
        ) {
            return false;
        }
        current = current.alternate;
    }
    return true;
};

const getWhileLooop = (program, order) => {
    const whileLoops = program.body.filter(
        ({ type }) => type === "WhileStatement"
    );
    if (whileLoops.length === 0) {
        return false;
    }
    return whileLoops[order];
};

const findFunctionDeclaration = (program, funcName) => {
    const functions = program.body.filter(
        (x) => x.type === "FunctionDeclaration"
    );
    if (functions.length === 0) {
        return false;
    }
    const func = functions.find(x => x.id && x.id.name === funcName);
    if (!func) {
        return false;
    }
    return func;
}

const isValidCondition = (condition) => {
    if (!condition) {
        return false;
    }
    const allowedOperators = ['==', '===', '<=', '<', '>=', '>', '!=', '!=='];
    return condition.test.value || allowedOperators.some(o => o === condition.test.operator)
}

const sendUserCodeForQuestion = (js, html, css) => {
    if (window.codeBoxSendCodeToServer) {
        fetch(`${window.origin_url_path}/user/question-solution`, {
            body: JSON.stringify({
                email: window.user_email,
                socketId: window.socket_id,
                questionId: window.question_id,
                userCode: {
                    js: {
                        fileName: "index.js",
                        content: js
                    },
                    html: {
                        fileName: "index.html",
                        content: html
                    },
                    css: {
                        fileName: "styles.css",
                        content: css
                    }
                }
            }),
            method: "post",
            headers: {
                "Content-Type": "application/json"
            }
        });
    }
}



module.exports = {
    searchVariableDeclaration,
    isVariableDeclared,
    isIncludeLoop,
    countVariableDeclaration,
    searchAnyVariableDeclaration,
    searchVariableByOrderDeclaration,
    searchVarableByOrderDeclaration,
    searchVarableByNameDeclaration,
    searchAndFetchVarableByNameDeclaration,
    searchVaiableAssinementExpression,
    findForLoopDeclatrion,
    haveForLoopDeclatrion,
    searchArrayDeclatrion,
    searchArrayDeclatrion,
    searchNameAndValuesArrayDeclatrion,
    searchArrayDeclatrionByName,
    createtCodeBlockWithReturn,
    ping,
    sendUserCodeForQuestion,
    searchConsoleLog,
    findForLoopDeclatrionWithNegative,
    isValidElseIfDeclaration,
    getIfDeclaration,
    getIfStatements,
    isValidCondition,
    getWhileLooop,
    findFunctionDeclaration,
    isNestedLoops,
    sendQuestion
}
