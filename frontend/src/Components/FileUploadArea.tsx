import { Component, createSignal, Show } from 'solid-js'
import FileUploadPopUp from './FileUploadPopUp'

const FileUploadArea: Component = () => {
  const [file, setFile] = createSignal<File | null>(null)
  const [showForm, setShowForm] = createSignal(false)
  const [fileUploadError, setFileUploadError] = createSignal({
    show: false,
    msg: '',
  })
  const [fileMutateOptions, setFileMutateOptions] = createSignal({
    action: 1,
    valueType: 1,
    index: 1,
  })

  function handleFileChange(event: Event) {
    const inputElement = event.target as HTMLInputElement
    const selectedFile = inputElement.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
    }
  }

  function fileTypeVerifier() {
    if (!file()) {
      return
    }
    const filename = file()?.name.split('.')
    if (!filename) {
      setFileUploadError({
        show: true,
        msg: 'Please Provide a File with a name and suffix',
      })
      return
    }
    const suffix = filename[filename.length - 1]
    if (suffix.toLowerCase() != 'csv') {
      setFileUploadError({
        show: true,
        msg: 'Please Provide a file of type .csv',
      })
      return
    }

    setFileUploadError({
      show: false,
      msg: '',
    })
    setShowForm(true)
  }

  function handleFormSubmit() {
    return
  }

  return (
    <>
      <section class="w-full py-12 md:py-24 lg:py-32 relative">
        <div class="container px-4 md:px-6">
          <div class="flex flex-col gap-4 items-center justify-center text-center">
            <h2 class="text-green-600 text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Upload your CSV. Let's get started.
            </h2>
            <div class="mt-2 flex items-center mx-auto max-w-[400px] space-y-2">
              <input
                id="file"
                placeholder="Choose a file"
                type="file"
                required
                onChange={e => handleFileChange(e)}
              />
              <button
                onClick={fileTypeVerifier}
                class="inline-flex bg-white w-1/3 text-black rounded-lg items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full"
              >
                Submit
              </button>
            </div>
            <Show when={fileUploadError().show}>
              <p class="absolute top-0 bg-red-500 p-2 font-bold text-center">
                {fileUploadError().msg}
              </p>
            </Show>
          </div>
        </div>
      </section>
      <Show when={showForm()}>
        <FileUploadPopUp
          setShowForm={setShowForm}
          fileMutateOptions={fileMutateOptions}
          setFileMutateOptions={setFileMutateOptions}
          handleFormSubmit={handleFormSubmit}
        />
      </Show>
    </>
  )
}

export default FileUploadArea
