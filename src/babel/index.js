import { addDefault } from '@babel/helper-module-imports';
import {
  doesReturnJSX,
  getTypesFromFilename,
  isWrappedComponentSet,
  makeWrappedComponent,
} from './helpers';


export default ({ types: t }) => ({
  visitor: {
    Program(path, state) {
      addDefault(path, 'remixx', { nameHint: 'Remixx' });
    },
    ExportDefaultDeclaration(
      path,
      { file: { opts } },
    ) {
      const declarationNode = path.get('declaration');
      const arrow = declarationNode.isArrowFunctionExpression();
      // console.log(declarationNode)

      if (opts.filename.includes('App.jsx')) {
        return;
      }

      if (
        !declarationNode.isArrowFunctionExpression()
        && !declarationNode.isFunctionDeclaration()
      ) {
        return;
      }

      if (!doesReturnJSX(declarationNode.get('body'))) {
        return;
      }

      const { name: functionName } = node.node.id || {};
      const { identifier, name } = arrow
        ? getTypesFromFilename(t, opts)
        : ({
          identifier: t.identifier(functionName),
          name: functionName,
        });


      // sets display name
      declarationNode.node.id = identifier;

      const { body, id, params } = declarationNode.node;
      // checks to see if we need to convert `export default function () {}`
      const init = arrow
        ? declarationNode.node
        : t.functionExpression(id, params, body);

      const variable = t.variableDeclaration('const', [
        t.variableDeclarator(identifier, init),
      ]);
      const assignment = isDisplayNameSet(path.getStatementParent(), name)
        ? undefined
        : makeDisplayName(t, name);
      const exporter = t.exportDefaultDeclaration(identifier);

      path.replaceWithMultiple([
        variable,
        assignment,
        exporter,
        // filter out possibly undefined assignment
      ].filter(replacement => !!replacement));
    },

    JSXAttribute(path) {
      // if its the initial provider where the store is attached
      // dont try and wrap it
      if (
        path.node &&
        path.node.name &&
        path.node.name.name === 'store' &&
        path.parentPath.isJSXOpeningElement() &&
        path.parent && path.parent.name && path.parent.name.name === 'ReduxProvider'
      ) {

        // Object.assign(path.scope.getFunctionParent(), { isReduxProvider: true });
      }
    },
    JSXElement(path, { file: { opts } }) {
      const { parentPath: parent } = path;

      if (opts.filename.includes('App.jsx')) {
        return;
      }

      // if(path.node && path.scope) {
      //   traverse(path.node, {
      //     JSXIdentifier(path) {
      //       // console.log(path.node.name);
      //     }
      //   }, path.scope);
      // }

      // avoids traversing assigning jsx to variable
      if (!(parent.isReturnStatement() || parent.isArrowFunctionExpression())) {
        return;
      }
      const variable = path.find(node => node.isVariableDeclarator() || node.isExportDefaultDeclaration()
        || node.isJSXExpressionContainer() || node.isFunctionDeclaration());

      // Ignore JSX elements inside JSX expression blocks
      if (t.isJSXExpressionContainer(variable)) {
        return;
      }

      // console.log(path)


      const name = (() => {
        try {
          return variable.get('id.name').node;
        } catch (errr) {
          return undefined;
        }
      })();


      if (name) {
        variable.node.id.name = `Wrapped${name}`;
      }

      if (name == null) {
        return;
      }

      const statement = variable.getStatementParent();


      // check to make sure we don't set displayName when already set
      if (isWrappedComponentSet(statement, name)) {
        return;
      }

      statement.insertAfter(makeWrappedComponent(t, name));
    },
  },
});
