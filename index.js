const process = require('process');

module.exports = function (plop) {
    // react seam app generator
    plop.setGenerator('createapp', {
        description: 'create app generator',
        prompts:
            [
                {
                    type: 'input',
                    name: 'projectName',
                    message: 'please enter app name'
                },
                {
                    type: 'input',
                    name: 'projectHtmlTitle',
                    message: 'please enter app html title'
                },
                {
                    type: 'input',
                    name: 'projectDescribtion',
                    message: 'please enter app describtions'
                },
                {
                    type: 'confirm',
                    name: 'wantGitRepo',
                    message: 'do you want to create git repository?',
                    default:false
                },
                {
                    type: 'input',
                    name: 'projectGitUrl',
                    message: 'please enter app Git Url'
                },
                {
                    type: 'input',
                    name: 'projectLicense',
                    message: 'please enter app license'
                },
                {
                    type: 'input',
                    name: 'projectDefaultPort',
                    message: 'please enter app default server port'
                }
        ],
        actions: data => {
                const actions = [
                    {
                        type: 'add',
                        path: `app/index.html`,
                        templateFile: 'templates/index.html.hbs'
                    },
                    {
                        type: 'add',
                        path: `server/port.js`,
                        templateFile: 'templates/port.js.hbs'
                    },
                    {
                        type: 'add',
                        path: `package.json`,
                        templateFile: 'templates/package.json.hbs'
                    },
                    {
                        type: 'addMany',
                        destination: process.cwd(),
                        base:'templates/sources',
                        globOptions:{
                            dot:true
                        },
                        templateFiles: 'templates/sources/**'
                    },
                ]
                return actions;
            }
    });
};