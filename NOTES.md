## Structuring
Folders 
./src
    /assets
    /boot
    /classes
    /components
    /css            
    /layouts
    /pages
    /router
    /static
    /store
    /types
    /typings
    /utility

### Types
Types should be defined in seperate files and should be put into './src/types' folder.
Each definition should have their own file. The filename should contain if its an interface or a type: 'example.type.ts' or 'AnotherExample.interface.ts'
The types folder should be bundled with an index.ts file.

### Exports
