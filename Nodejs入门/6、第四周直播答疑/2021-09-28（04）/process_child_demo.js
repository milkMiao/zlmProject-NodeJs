const spawn = require('child_process').spawn;
const ls = spawn('ls', ['-lh', '/usr'], {
    stdio: ['inherit', 'inherit', 'inherit']
});

// ls.stdout.on('data', (data) => {
//     console.log(`stdout: ${data}`);
// });

