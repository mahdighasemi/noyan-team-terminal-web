$(document).ready(function() {
    var state = 0;
    var files = {
        'home': {
            'team': {
                'mahdi': {
                    'profile.txt': `
                        <img src='./mahdi.jpg' style='width:200px; border-radius:16px;' />
                        <h5>Name: Mahdi Ghasemi</h5>
                        <h5>Birthday: 22 October 1997 </h5>
                        <br>
                    `,
                },
                'behrad': {
                    'profile.txt': `
                        <img src='./behrad.jpg' style='width:200px; border-radius:16px;' />
                        <h5>Name: Behrad Jafari</h5>
                        <h5>Birthday: ....</h5>
                        <br>
                    `,
                },
                'vahid': {
                    'profile.txt': `
                        <img src='./vahid.jpg' style='width:200px; border-radius:16px;' />
                        <h5>Name: Vahid Ghaffari</h5>
                        <h5>Birthday: ....</h5>
                        <br>
                    `,
                },
                'mehdi': {
                    'profile.txt': `
                        <img src='./mehdi.jpg' style='width:200px; border-radius:16px;' />
                        <h5>Name: Mehdi Hoseini</h5>
                        <h5>Birthday: ... </h5>
                        <br>
                    `,
                },
                'nafise': {
                    'profile.txt': `
                        <img src='./nafise.jpg' style='width:200px; border-radius:16px;' />
                        <h5>Name: Nafise</h5>
                        <h5>Birthday: ....</h5>
                        <br>
                    `,
                },
                'mohsen': {
                    'profile.txt': `
                        <img src='./mohsen.jpg' style='width:200px; border-radius:16px;' />
                        <h5>Name: Mohsen</h5>
                        <h5>Birthday: ....</h5>
                        <br>
                    `,
                },
                'hesam': {
                    'profile.txt': `
                        <img src='./hesam.jpg' style='width:200px; border-radius:16px;' />
                        <h5>Name: Hesam Nemati</h5>
                        <h5>Birthday: ....</h5>
                        <br>
                    `,
                },
                'mohammad_reza': {
                    'profile.txt': `
                        <img src='./mohammad_reza.jpg style='width:200px; border-radius:16px;' />
                        <h5>Name: Mohammad reza Ghariblo</h5>
                        <h5>Birthday: ....</h5>
                        <br>
                    `,
                }
            }
        }
    };

    function setParents(path) {
        for (file in path) {
            if (file != '..' && file != '.') {
                if (typeof(path[file]) === 'object') {
                    path[file]['..'] = path;
                    path[file]['!name'] = file;
                    path[file]['.'] = path[file];
                    setParents(path[file]);
                }
            }
        }
    }
    setParents(files);

    var homepath = files['home']['team'];
    var path = homepath;

    function pwd(path) {
        dirs = [];
        tmp = path;
        while ('..' in tmp) {
            dirs.push(tmp);
            tmp = tmp['..'];
        }
        ret = ''
        for (var i = dirs.length - 1; i >= 0; i--) {
            ret += '/' + dirs[i]['!name'];
        }
        return ret;
    }

    var programs = {
        'clear': function(args) {
            console.clear();
        },
        'ls': function(args) {
            if ('.' in path)
                console.printHTML('. ');
            if ('..' in path)
                console.printHTML('.. ');
            for (f in path) {
                if (!f.startsWith('!') && f != '.' && f != '..')
                    console.printHTML(f + ' ');
            }
            console.printHTML('<br>');
        },
        'cd': function(args) {
            if (args[1] in path && typeof(path[args[1]]) === 'object') {
                path = path[args[1]];
            } else {
                console.printHTML('Directory does not exist!<br>');
            }
        },
        'rm': function(args) {
            console.printHTML('-_-<br>');
        },
        'cat': function(args) {
            if (args.length < 2)
                console.printHTML('No file specified!<br>');
            else
            if (args[1] in path && typeof(path[args[1]]) == 'string')
                console.printHTML(path[args[1]]);
            else
                console.printHTML('File does not exist!<br>');
        },
        'pwd': function() {
            dir = pwd(path);
            dir = (dir ? dir : '/');
            console.printHTML(dir + '<br>');
        }
    };

    function prompt() {
        var pt = pwd(path).replace(pwd(homepath), '~');
        if (pt == '') pt = '/';
        console.printText("root@madtalk:" + pt + "# ", 'color:#52a977', {
            enable: true
        });
    }


    var console = new teletype(document.getElementById('console'), function(input) {
        var tokens = input.split(' ');
        if (tokens[0] in programs)
            programs[tokens[0]](tokens);
        else {
            console.printHTML(tokens[0] + ': command not found...<br>');
        }
        prompt();
    });

    function print_delay(str, delay) {
        if (!delay) delay = 50;
        console.printHTML(str, {
            wait: 1000,
            delay: delay
        });
    }


    print_delay(`<pre style='color:#52a977;width: 360px;margin:15px auto;'>
              (((
           (((((((((
        ((((((((((((((
    (((((((((((((((((((((@
    ((((((((((((((((((((@@(
    ((((@(((((((((((((@@@((
    ((((@@@((((((((@@@@@(((
    ((((@@@@((((@@@@@((((((
    ((((((@@@@@@@@@((((((((
    ((((((((@@@@@((((((((((
        ((((((@((((((((
           (((((((((
              (((
        </pre>`, 10)
    print_delay("<div style='text-align:center; margin-top:25px;'><span style='font-size:2.5em;line-height:1.3em;'>Hi <img src='hello.png' style='height:1.3em;vertical-align:middle;'/> this is <i><b>Madtalk Family</b></i> :))</span></div><br><br>", 100);
    print_delay("<div style='text-align:center;'> <span style='font-size:1.5em;font-weight:500;color:#f59834'>We do whatever we want, everyone said you can not, we will <b>do</b> it!</span></div><br>")


    prompt();


});