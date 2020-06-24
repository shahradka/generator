const process = require('process');
const path = require("path");
module.exports = function (plop) {
    // react seam app generator
    const processDir = process.cwd();
    plop.setGenerator('CreateApp', {
        description: 'create app generator',
        prompts:
            [
                {
                    type: 'input',
                    name: 'projectName',
                    message: 'Please Enter App Name'
                },
                {
                    type: 'editor',
                    name: 'projectDescribtion',
                    message: 'Please enter app describtions'
                },
                {
                    type: 'confirm',
                    name: 'wantGitRepo',
                    message: 'Do You Want Intiate Git Repository?',
                    default:false
                },
                {
                    type: 'input',
                    name: 'gitRepoUrl',
                    message: 'Please Enter Git Repository Url:',
                    when:(ans)=>{
                        return ans.wantGitRepo;
                    }
                },
                {
                    type: 'list',
                    name: 'projectLicense',
                    message: 'Please Select Project License:',
                    choices: ['MIT', 'ISC', 'Apache', 'GNU', 'OTHER']
                },
                {
                    type: 'input',
                    name: 'otherProjectLicense',
                    message: 'Please Enter Project License:',
                    when:(ans)=>{
                        return ans.projectLicense;
                    }
                },
                {
                    type: 'input',
                    name: 'projectDefaultPort',
                    default:3500,
                    message: 'Please Enter App Default Server Port'
                }
        ],
        actions: data => {
                const actions = [
                    {
                        type: 'add',
                        path: path.join(processDir,data.projectName,`app/index.html`),
                        templateFile: '../templates/index.html.hbs',
                        abortOnFail:true
                    },
                    {
                        type: 'add',
                        path: path.join(processDir,data.projectName,`server/port.js`),
                        templateFile: '../templates/port.js.hbs',
                        abortOnFail:true
                    },
                    {
                        type: 'add',
                        path: path.join(processDir,data.projectName,`package.json`),
                        templateFile: '../templates/package.json.hbs',
                        abortOnFail:true
                    },
                    {
                        type: 'addMany',
                        destination: path.join(processDir,data.projectName),
                        base: '../templates/sources/',
                        stripExtensions:['notHbs'],
                        abortOnFail:true,
                        globOptions:{
                            dot:true
                        },
                        templateFiles: '../templates/sources/**'
                    },
                ]
                return actions;
            }
    });
};

