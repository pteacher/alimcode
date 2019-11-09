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
    codeEditor.doc.setValue('print("hello")\nmove();');

    //codeEditor.addLineClass(0, 'wrap', 'line-error');
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
