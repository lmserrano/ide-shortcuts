function preg_quote(str, delimiter) {
    //  discuss at: http://phpjs.org/functions/preg_quote/
    // original by: booeyOH
    // improved by: Ates Goral (http://magnetiq.com)
    // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // improved by: Brett Zamir (http://brett-zamir.me)
    // bugfixed by: Onno Marsman
    //   example 1: preg_quote("$40");
    //   returns 1: '\\$40'
    //   example 2: preg_quote("*RRRING* Hello?");
    //   returns 2: '\\*RRRING\\* Hello\\?'
    //   example 3: preg_quote("\\.+*?[^]$(){}=!<>|:");
    //   returns 3: '\\\\\\.\\+\\*\\?\\[\\^\\]\\$\\(\\)\\{\\}\\=\\!\\<\\>\\|\\:'

    return String(str)
        .replace(new RegExp('[.\\\\+*?\\[\\^\\]$(){}=!<>|:\\' + (delimiter || '') + '-]', 'g'), '\\$&');
}

// app.js
angular.module('sortApp', ['ngSanitize'])

    .filter('highlight', function ($sce) {
        return function (text, phrase) {
            if (phrase && text.toLowerCase().contains(phrase))
                text = text.replace( new RegExp( "(" + preg_quote( phrase ) + ")" , 'gi' ), '<span class="highlighted">$1</span>' );
            
            return $sce.trustAsHtml(text)
        }
    })

    .controller('mainController', function ($scope) {
        $scope.keyPressed = '';

        var isModifierPressed = function (event) {
            return event.ctrlKey || event.altKey || event.shiftKey;
        }

        var isValidCharacterKeyCode = function(param){
            var valid =
                (param > 47 && param < 58)   || // number keys
                param == 32                    || // spacebar
                (param > 64 && param < 91)   || // letter keys
                (param > 95 && param < 112)  || // numpad keys
                (param > 185 && param < 193) || // ;=,-./` (in order)
                (param > 218 && param < 223);   // [\]' (in order)

            return valid;
        }

        $scope.onKeyDown = function (event) {
            if (isModifierPressed(event)) {
                var result = '';
                if (event.ctrlKey)
                    result += 'Ctrl + ';
                if (event.altKey)
                    result += 'Alt + ';
                if (event.shiftKey)
                    result += 'Shift + ';
                event.preventDefault();
                $scope.search = result;
                if(isValidCharacterKeyCode(event.keyCode))
                    $scope.search += String.fromCharCode(event.which);
            } else {
                if($scope.search.contains('+'))
                    $scope.search = '';
            }
        }

        $scope.shortcutTables = [
            {
                shortcutScope: 'Editing',
                shortcuts: [
                    {
                        eclipse: 'Ctrl + Space',
                        intellij: 'Ctrl + Space',
                        description: 'Basic code completion (the name of any class,method or variable)'
                    },
                    {
                        eclipse: '',
                        intellij: 'Ctrl + Shift + Space',
                        description: 'Smart code completion (filters the list of methods and variables by expected type)'
                    },
                    {
                        eclipse: '',
                        intellij: 'Ctrl + Shift + Enter',
                        description: 'Complete statement'
                    },
                    {
                        eclipse: 'Ctrl + Shift + Space',
                        intellij: 'Ctrl + P',
                        description: 'Parameter info (within method call arguments)'
                    },
                    {
                        eclipse: 'F2',
                        intellij: 'Ctrl + Q',
                        description: 'Quick documentation lookup'
                    },
                    {eclipse: '', intellij: 'Shift + F1', description: 'External Doc'},
                    {
                        eclipse: '',
                        intellij: 'Ctrl + mouse over code',
                        description: 'Brief Info'
                    },
                    {
                        eclipse: 'F2',
                        intellij: 'Ctrl + F1',
                        description: 'Show descriptions of error or warning at caret'
                    },
                    {
                        eclipse: '',
                        intellij: 'Alt + Insert',
                        description: 'Generate code... (Getters, Setters, Constructors, hashCode/equals, toString)'
                    },
                    {eclipse: '', intellij: 'Ctrl + O', description: 'Override methods'},
                    {eclipse: '', intellij: 'Ctrl + I', description: 'Implement methods'},
                    {
                        eclipse: '',
                        intellij: 'Ctrl + Alt + T',
                        description: 'Surround with... (if..else, try..catch, for, synchronized, etc.)'
                    },
                    {
                        eclipse: 'Ctrl + Shift + C',
                        intellij: 'Ctrl + NumPad/',
                        description: 'Comment/uncomment with line comment'
                    },
                    {
                        eclipse: 'Ctrl + Shift + /',
                        intellij: 'Ctrl + Shift + NumPad/',
                        description: 'Comment/uncomment with block comment'
                    },
                    {
                        eclipse: 'Ctrl + Shift + Up',
                        intellij: 'Ctrl + W',
                        description: 'Select successively increasing code blocks'
                    },
                    {
                        eclipse: 'Ctrl + Shift + Down',
                        intellij: 'Ctrl + Shift + W',
                        description: 'Decrease current selection to previous state'
                    },
                    {eclipse: '', intellij: 'Alt + Q', description: 'Context info'},
                    {
                        eclipse: 'Ctrl + 1',
                        intellij: 'Alt + Enter',
                        description: 'Show intention actions and quick-fixes'
                    },
                    {
                        eclipse: 'Ctrl + Shift + F',
                        intellij: 'Ctrl + Alt + L',
                        description: 'Reformat code'
                    },
                    {
                        eclipse: 'Ctrl + Shift + O',
                        intellij: 'Ctrl + Alt + O',
                        description: 'Optimize imports'
                    },
                    {
                        eclipse: '',
                        intellij: 'Ctrl + Alt + I',
                        description: 'Auto-indent line(s)'
                    },
                    {
                        eclipse: '',
                        intellij: 'Tab / Shift + Tab',
                        description: 'Indent/unindent selected lines'
                    },
                    {
                        eclipse: '',
                        intellij: 'Ctrl + X or Shift + Delete',
                        description: 'Cut current line or selected block to clipboard'
                    },
                    {
                        eclipse: '',
                        intellij: 'Ctrl + C or Ctrl + Insert',
                        description: 'Copy current line or selected block to clipboard'
                    },
                    {
                        eclipse: '',
                        intellij: 'Ctrl + V or Shift + Insert',
                        description: 'Paste from clipboard'
                    },
                    {
                        eclipse: '',
                        intellij: 'Ctrl + Shift + V',
                        description: 'Paste from recent buffers...'
                    },
                    {
                        eclipse: 'Ctrl + Alt + Up',
                        intellij: 'Ctrl + D',
                        description: 'Duplicate current line or selected block'
                    },
                    {
                        eclipse: 'Ctrl + D',
                        intellij: 'Ctrl + Y',
                        description: 'Delete line at caret'
                    },
                    {
                        eclipse: '',
                        intellij: 'Ctrl + Shift + J',
                        description: 'Smart line join'
                    },
                    {eclipse: '', intellij: 'Ctrl + Enter', description: 'Smart line split'},
                    {
                        eclipse: 'Shift + Enter',
                        intellij: 'Shift + Enter',
                        description: 'Start new line'
                    },
                    {
                        eclipse: 'Ctrl + Shift + X / Y',
                        intellij: 'Ctrl + Shift + U',
                        description: 'Toggle case for word at caret or selected block'
                    },
                    {
                        eclipse: '',
                        intellij: 'Ctrl + Shift + ] / [',
                        description: 'Select till code block end/start'
                    },
                    {
                        eclipse: 'Ctrl + Delete',
                        intellij: 'Ctrl + Delete',
                        description: 'Delete to word end'
                    },
                    {
                        eclipse: '',
                        intellij: 'Ctrl + Backspace',
                        description: 'Delete to word start'
                    },
                    {
                        eclipse: 'Ctrl + NumPad+/-',
                        intellij: 'Ctrl + NumPad+/-',
                        description: 'Expand/collapse code block'
                    },
                    {
                        eclipse: 'Ctrl + NumPad*',
                        intellij: 'Ctrl + Shift + NumPad+',
                        description: 'Expand all'
                    },
                    {
                        eclipse: 'Ctrl + Shift + NumPad/',
                        intellij: 'Ctrl + Shift + NumPad-',
                        description: 'Collapse all'
                    },
                    {
                        eclipse: 'Ctrl + W',
                        intellij: 'Ctrl + F4',
                        description: 'Close active editor tab'
                    },
                    {
                        eclipse: 'Alt + Up/Down',
                        intellij: 'Ctrl + Shift + Up/Down',
                        description: 'Move line up/down'
                    },
                    {
                        eclipse: 'Ctrl  + Up/Down',
                        intellij: '',
                        description: 'Scroll Line up/down'
                    }
                ]
            },
            {
                shortcutScope: 'Search and Replace',
                shortcuts: [
                    {eclipse: '', intellij: 'Double Shift', description: 'Search everywhere'},
                    {eclipse: 'Ctrl + F', intellij: 'Ctrl + F', description: 'Find'},
                    {eclipse: 'Ctrl + K', intellij: 'F3', description: 'Find next'},
                    {
                        eclipse: 'Ctrl + Shift + K',
                        intellij: 'Shift + F3',
                        description: 'Find previous'
                    },
                    {eclipse: 'Ctrl + F', intellij: 'Ctrl + R', description: 'Replace'},
                    {
                        eclipse: 'Ctrl + H',
                        intellij: 'Ctrl + Shift + F',
                        description: 'Find in path'
                    },
                    {
                        eclipse: '',
                        intellij: 'Ctrl + Shift + R',
                        description: 'Replace in path'
                    },
                    {
                        eclipse: '',
                        intellij: 'Ctrl + Shift + S',
                        description: 'Search structurally (Ultimate Edition only)'
                    },
                    {
                        eclipse: '',
                        intellij: 'Ctrl + Shift + M',
                        description: 'Replace structurally (Ultimate Edition only)'
                    }
                ]
            }, {
                shortcutScope: 'Usage search',
                shortcuts: [
                    {eclipse: 'Ctrl + G', intellij: 'Alt + F7', description: 'Find usages'},
                    {
                        eclipse: 'Ctrl + Shift + G',
                        intellij: 'Ctrl + F7',
                        description: 'Find usages in file'
                    },
                    {
                        eclipse: '',
                        intellij: 'Ctrl + Shift + F7',
                        description: 'Highlight usages in file'
                    },
                    {eclipse: '', intellij: 'Ctrl + Alt + F7', description: 'Show usages'},
                    {
                        eclipse: 'Ctrl + Shift + U',
                        intellij: '',
                        description: 'Show occurences in File'
                    }
                ]
            }, {
                shortcutScope: 'Compile and Run',
                shortcuts: [
                    {
                        eclipse: 'Ctrl + B',
                        intellij: 'Ctrl + F9',
                        description: 'Make project (compile modifed and dependent)'
                    },
                    {
                        eclipse: '',
                        intellij: 'Ctrl + Shift + F9',
                        description: 'Compile selected file, package or module'
                    },
                    {
                        eclipse: '',
                        intellij: 'Alt + Shift + F10',
                        description: 'Select configuration and run'
                    },
                    {
                        eclipse: '',
                        intellij: 'Alt + Shift + F9',
                        description: 'Select configuration and debug'
                    },
                    {eclipse: 'Ctrl + F11', intellij: 'Shift + F10', description: 'Run'},
                    {eclipse: '', intellij: 'Shift + F9', description: 'Debug'},
                    {
                        eclipse: '',
                        intellij: 'Ctrl + Shift + F10',
                        description: 'Run context configuration from editor'
                    }
                ]
            }, {
                shortcutScope: 'Debugging',
                shortcuts: [
                    {eclipse: 'F6', intellij: 'F8', description: 'Step over'},
                    {eclipse: 'F5', intellij: 'F7', description: 'Step into'},
                    {eclipse: '', intellij: 'Shift + F7', description: 'Smart step into'},
                    {eclipse: 'F7', intellij: 'Shift + F8', description: 'Step out'},
                    {eclipse: 'Ctrl + R', intellij: 'Alt + F9', description: 'Run to cursor'},
                    {
                        eclipse: 'Ctrl + U',
                        intellij: 'Alt + F8',
                        description: 'Evaluate expression'
                    },
                    {eclipse: 'F8', intellij: 'F9', description: 'Resume program'},
                    {
                        eclipse: 'Ctrl + Shift + B',
                        intellij: 'Ctrl + F8',
                        description: 'Toggle breakpoint'
                    },
                    {
                        eclipse: 'Alt + Shift + Q, B',
                        intellij: 'Ctrl + Shift + F8',
                        description: 'View breakpoints'
                    }
                ]
            }, {
                shortcutScope: 'Navigation',
                shortcuts: [
                    {
                        eclipse: 'Ctrl + Shift + T',
                        intellij: 'Ctrl + N',
                        description: 'Go to class'
                    },
                    {
                        eclipse: 'Ctrl + Shift + R',
                        intellij: 'Ctrl + Shift + N',
                        description: 'Go to file'
                    },
                    {
                        eclipse: '',
                        intellij: 'Ctrl + Alt + Shift + N',
                        description: 'Go to symbol'
                    },
                    {
                        eclipse: 'Ctrl (+ Shift) + Tab',
                        intellij: 'Alt + Right/Left',
                        description: 'Go to next/previous editor tab'
                    },
                    {
                        eclipse: '',
                        intellij: 'F12',
                        description: 'Go back to previous tool window'
                    },
                    {
                        eclipse: '',
                        intellij: 'Esc',
                        description: 'Go to editor (from tool window)'
                    },
                    {
                        eclipse: '',
                        intellij: 'Shift + Esc',
                        description: 'Hide active or last active window'
                    },
                    {
                        eclipse: '',
                        intellij: 'Ctrl + Shift + F4',
                        description: 'Close active run/messages/find/... tab'
                    },
                    {eclipse: 'Ctrl + L', intellij: 'Ctrl + G', description: 'Go to line'},
                    {
                        eclipse: 'Ctrl + E',
                        intellij: 'Ctrl + E',
                        description: 'Recent files popup'
                    },
                    {
                        eclipse: 'Alt + Left/Right',
                        intellij: 'Ctrl + Alt + Left/Right',
                        description: 'Navigate back/forward'
                    },
                    {
                        eclipse: '',
                        intellij: 'Ctrl + Shift + Backspace',
                        description: 'Navigate to last edit location'
                    },
                    {
                        eclipse: '',
                        intellij: 'Alt + F1',
                        description: 'Select current file or symbol in any view'
                    },
                    {eclipse: 'F3', intellij: 'Ctrl + B', description: 'Go to declaration'},
                    {
                        eclipse: 'Ctrl + Click',
                        intellij: 'Ctrl + Click',
                        description: 'Go to declaration'
                    },
                    {
                        eclipse: 'Ctrl + T',
                        intellij: 'Ctrl + Alt + B',
                        description: 'Go to implementation(s)'
                    },
                    {
                        eclipse: '',
                        intellij: 'Ctrl + Shift + I',
                        description: 'Open quick definition lookup'
                    },
                    {
                        eclipse: '',
                        intellij: 'Ctrl + Shift + B',
                        description: 'Go to type declaration'
                    },
                    {
                        eclipse: '',
                        intellij: 'Ctrl + U',
                        description: 'Go to super-method/super-class'
                    },
                    {
                        eclipse: 'Ctrl + Shift + Up/Down',
                        intellij: 'Alt + Up/Down',
                        description: 'Go to previous/next method'
                    },
                    {
                        eclipse: 'Ctrl + Shift + P',
                        intellij: 'Ctrl + ] / [',
                        description: 'Move to code block end/start'
                    },
                    {
                        eclipse: 'Ctrl + O',
                        intellij: 'Ctrl + F12',
                        description: 'File structure popup'
                    },
                    {eclipse: 'F4', intellij: 'Ctrl + H', description: 'Type hierarchy'},
                    {
                        eclipse: '',
                        intellij: 'Ctrl + Shift + H',
                        description: 'Method hierarchy'
                    },
                    {
                        eclipse: 'Ctrl + Alt + H',
                        intellij: 'Ctrl + Alt + H',
                        description: 'Call hierarchy'
                    },
                    {
                        eclipse: 'Ctrl + . / Ctrl + ,',
                        intellij: 'F2 / Shift + F2',
                        description: 'Next/previous highlighted error'
                    },
                    {
                        eclipse: '',
                        intellij: 'F4 / Ctrl + Enter',
                        description: 'Edit source / View source'
                    },
                    {
                        eclipse: 'Alt + Shift + B',
                        intellij: 'Alt + Home',
                        description: 'Show navigation bar'
                    }
                ]
            }, {
                shortcutScope: 'Bookmarks',
                shortcuts: [
                    {eclipse: '', intellij: 'F11', description: 'Toggle bookmark'},
                    {
                        eclipse: '',
                        intellij: 'Ctrl + F11',
                        description: 'Toggle bookmark with mnemonic'
                    },
                    {
                        eclipse: '',
                        intellij: 'Ctrl + #[0-9]',
                        description: 'Go to numbered bookmark'
                    },
                    {eclipse: '', intellij: 'Shift + F11', description: 'Show bookmarks'}
                ]
            }, {
                shortcutScope: 'Refactoring',
                shortcuts: [
                    {eclipse: '', intellij: 'F5', description: 'Copy'},
                    {eclipse: '', intellij: 'F6', description: 'Move'},
                    {eclipse: '', intellij: 'Alt + Delete', description: 'Safe Delete'},
                    {
                        eclipse: 'Alt + Shift + R',
                        intellij: 'Shift + F6',
                        description: 'Rename'
                    },
                    {
                        eclipse: 'Alt + Shift + C',
                        intellij: 'Ctrl + F6',
                        description: 'Change Signature'
                    },
                    {
                        eclipse: 'Alt + Shift + I',
                        intellij: 'Ctrl + Alt + N',
                        description: 'Inline'
                    },
                    {
                        eclipse: 'Alt + Shift + M',
                        intellij: 'Ctrl + Alt + M',
                        description: 'Extract Method'
                    },
                    {
                        eclipse: 'Ctrl + 2, L',
                        intellij: 'Ctrl + Alt + V',
                        description: 'Extract Variable'
                    },
                    {
                        eclipse: 'Alt + Shift + L',
                        intellij: 'Ctrl + Alt + V',
                        description: 'Extract Variable'
                    },
                    {
                        eclipse: 'Ctrl + 2, F',
                        intellij: 'Ctrl + Alt + F',
                        description: 'Extract Field'
                    },
                    {
                        eclipse: '',
                        intellij: 'Ctrl + Alt + C',
                        description: 'Extract Constant'
                    },
                    {
                        eclipse: '',
                        intellij: 'Ctrl + Alt + P',
                        description: 'Extract Parameter'
                    }
                ]
            }, {
                shortcutScope: 'VCS / Local History',
                shortcuts: [
                    {eclipse: '', intellij: 'Ctrl + K', description: 'Commit project to VCS'},
                    {
                        eclipse: '',
                        intellij: 'Ctrl + T',
                        description: 'Update project from VCS'
                    },
                    {
                        eclipse: '',
                        intellij: 'Alt + Shift + C',
                        description: 'View recent changes'
                    },
                    {
                        eclipse: '',
                        intellij: 'Alt + BackQuote "`"',
                        description: '"VCS" quick popup'
                    }
                ]
            }, {
                shortcutScope: 'Live Templates',
                shortcuts: [
                    {
                        eclipse: '',
                        intellij: 'Ctrl + Alt + J',
                        description: 'Surround with Live Template'
                    },
                    {eclipse: '', intellij: 'Ctrl + J', description: 'Insert Live Template'},
                    {
                        eclipse: '',
                        intellij: 'iter',
                        description: 'Iteration according to Java SDK 1.5 style'
                    },
                    {
                        eclipse: '',
                        intellij: 'inst',
                        description: 'Check object type with instanceof and downcast it'
                    },
                    {
                        eclipse: '',
                        intellij: 'itco',
                        description: 'Iterate elements of java.util.Collection'
                    },
                    {
                        eclipse: '',
                        intellij: 'itit',
                        description: 'Iterate elements of java.util.Iterator'
                    },
                    {
                        eclipse: '',
                        intellij: 'itli',
                        description: 'Iterate elements of java.util.List'
                    },
                    {eclipse: '', intellij: 'psf', description: 'public static final'},
                    {eclipse: '', intellij: 'thr', description: 'throw new'}
                ]
            }, {
                shortcutScope: 'General',
                shortcuts: [
                    {
                        eclipse: 'Ctrl + M',
                        intellij: 'Alt + #[0-9]',
                        description: 'Open corresponding tool window'
                    },
                    {eclipse: '', intellij: 'Ctrl + S', description: 'Save all'},
                    {eclipse: '', intellij: 'Ctrl + Alt + Y', description: 'Synchronize'},
                    {
                        eclipse: '',
                        intellij: 'Ctrl + Shift + F12',
                        description: 'Toggle maximizing editor'
                    },
                    {
                        eclipse: '',
                        intellij: 'Alt + Shift + F',
                        description: 'Add to Favorites'
                    },
                    {
                        eclipse: '',
                        intellij: 'Alt + Shift + I',
                        description: 'Inspect current file with current profile'
                    },
                    {
                        eclipse: '',
                        intellij: 'Ctrl + BackQuote (`)',
                        description: 'Quick switch current scheme'
                    },
                    {
                        eclipse: '',
                        intellij: 'Ctrl + Alt + S',
                        description: 'Open Settings dialog'
                    },
                    {
                        eclipse: '',
                        intellij: 'Ctrl + Alt + Shift + S',
                        description: 'Open Project Structure dialog'
                    },
                    {
                        eclipse: 'Ctrl + 3',
                        intellij: 'Ctrl + Shift + A',
                        description: 'Find Action'
                    },
                    {
                        eclipse: '',
                        intellij: 'Ctrl + Tab',
                        description: 'Switch between tabs and tool window'
                    }
                ]
            }];

    });


