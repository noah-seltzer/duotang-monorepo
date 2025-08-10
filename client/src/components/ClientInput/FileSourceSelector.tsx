interface FileSourceSelectorProps {
    selectedOption: string
    onRadioButtonClicked: (e: string) => void
}

export function FileSourceSelector({selectedOption, onRadioButtonClicked}: FileSourceSelectorProps): React.JSX.Element {

    return (
        <>
            <div className='flex items-center mb-4'>
                <input
                    id='default-radio-1'
                    type='radio'
                    value='local'
                    name='default-radio'
                    checked={selectedOption === 'local'}
                    className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                    onChange={() => onRadioButtonClicked('local')}
                />
                <label
                    htmlFor='default-radio-1'
                    className='ms-2 text-sm font-medium text-gray-900 dark:text-gray-300'
                >
                    Local Files
                </label>
            </div>
            <div className='flex items-center'>
                <input
                    checked={selectedOption === 'onedrive'}
                    id='default-radio-2'
                    type='radio'
                    value=''
                    name='default-radio'
                    onChange={() => onRadioButtonClicked('onedrive')}
                    className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                />
                <label
                    htmlFor='default-radio-2'
                    className='ms-2 text-sm font-medium text-gray-900 dark:text-gray-300'
                >
                    OneDrive
                </label>
            </div>
        </>
    )
}
