const program = require('commander') // 快速开发命令行工具的node包
const shell = require('shelljs')
const download = require('git-clone') // 克隆远程仓库到本地
const open = require('open')
const inquirer = require('inquirer') // 支持问答交互
const {
    spawn
} = require('child_process')

// 设置版本号
program.version(require('./package.json').version)

const initAction = () => {
    inquirer.prompt([{
        type: 'input',
        message: '请输入项目名称：',
        name: 'projectName'
    }]).then(answers => {
        const {projectName} = answers;
        console.log(`项目名为：${projectName}`)
        console.log('正在拷贝项目，请稍等...')
        let giturl = 'https://github.com/baohuixiao/h5-gulp-template.git';
        download(giturl, `./${projectName}`, () => {
            shell.rm('-rf', `${projectName}/.git`) // 移除项目中的.git文件
            shell.cd(projectName) // 进入项目
            shell.exec('npm install') // 运行 npm install
            // 操作提示
            console.log(`
                创建项目${projectName}成功
                cd ${projectName} 进入项目
                mycli run 启动项目
                mycli start 预览项目
            `)
        })
    })
}

program
    .command('init')
    .description('初始化项目')
    .action(initAction)

program.command('new <name>')
    .description('创建项目')
    .action(name => {
        let giturl = 'https://github.com/vuejs/vue-next-webpack-preview.git';
        download(giturl, `./${name}`, () => {
            shell.rm('-rf', `${name}/.git`) // 移除项目中的.git文件
            shell.cd(name) // 进入项目
            shell.exec('npm install') // 运行 npm install
            // 操作提示
            console.log(`
                创建项目${name}成功
                cd ${name} 进入项目
                mycli run 启动项目
                mycli start 预览项目
            `)
        })
    })
program.command('run')
    .description('运行项目')
    .action(name => {
        shell.exec('gulp')
        // let cp = spawn('npm', ['run', 'dev'])
        // cp.stdout.pipe(process.stdout)
        // cp.stdout.pipe(process.stderr)
        // cp.on('close', () => {
        //     console.log('项目启动成功')
        // })
    })
program.command('start')
    .description('预览项目')
    .action(name => {
        open('http://localhost:7777/')
    })
/**
 * program.parse 是将命令参数传入commander管道中，一般放在最后执行
 * process.argv 可以获取到命令的参数，以数组返回
 */
program.parse(process.argv)