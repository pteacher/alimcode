var codeEditor;
$(document).ready(function() {
    codeEditor = document.editor = CodeMirror.fromTextArea(alimcode, {
        mode: 'python',
        keymap: 'sublime',
        lineNumbers: true,
        lineWrapping: false,
        theme: 'dracula',
        tabSize: 4,
        indentUnit: 4,
        foldGutter: true,
        gutters: ["CodeMirror-linenumbers", "breakpoints"],
        matchTags: {
            bothTags: true
        },
        matchBrackets: false,
        autoCloseTags: true,
        autoCloseBrackets: true,
        scrollbarStyle: 'overlay',
        styleActiveLine: true
    });
    codeEditor.doc.setValue('def move():\n    print("move();")\n\nfor i in range(3):\n    move()');

    
    /*
    $('.run-script').click(function () {
        runit();
        
        try {
            eval(codeEditor.doc.getValue());
            run();
        } catch(e) {
            alert('Исправьте ошибки');
        }    
        
    }) 
    */

    
});
