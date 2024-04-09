import { Component, createSignal, Show } from 'solid-js'
import FileUploadPopUp from './FileUploadPopUp'

const FileUploadArea: Component = () => {
  const [file, setFile] = createSignal<File | null>(null)
  const [outputFile, setOutputFile] = createSignal<File | null>(null)
  const [showForm, setShowForm] = createSignal(false)
  const [fileUploadError, setFileUploadError] = createSignal({
    show: false,
    msg: '',
  })
  const [loading, setLoading] = createSignal(false)
  const [showOutputFile, setShowOutputFile] = createSignal(false)
  const [fileMutateOptions, setFileMutateOptions] = createSignal({
    action: 1,
    valueType: 1,
    index: 1,
    searchValue: '',
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
    setShowOutputFile(false)
    setShowForm(true)
  }

  async function handleFormSubmit() {
    setLoading(true)
    setShowForm(false)
    if (!file()) {
      return
    }

    const formData = new FormData()
    formData.append('file', file()!)
    formData.append('action', fileMutateOptions().action.toString())
    formData.append('valueType', fileMutateOptions().valueType.toString())
    formData.append('index', fileMutateOptions().index.toString())
    formData.append('searchValue', fileMutateOptions().searchValue)

    try {
      const res = await fetch(import.meta.env.VITE_PROD_API_URL, {
        method: 'POST',
        body: formData,
      })
      const tempFile = await res.blob()
      setOutputFile(tempFile as File)
      setShowOutputFile(true)
      setFileMutateOptions({
        action: 1,
        valueType: 1,
        index: 1,
        searchValue: '',
      })
      setLoading(false)
    } catch (error) {
      setFileUploadError({
        show: true,
        msg: 'Unknown Error, Refresh and try again',
      })
    }
  }

  return (
    <>
      <section class="w-full py-12 md:py-24 lg:py-32 relative">
        <div class="container px-4 md:px-6">
          <div class="flex flex-col gap-4 items-center justify-center text-center">
            <h2 class="text-green-600 text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Upload your CSV. Let's get started.
            </h2>
            <div class="mt-2 flex items-center justify-center">
              <input
                id="file"
                placeholder="Choose a file"
                type="file"
                required
                onChange={e => handleFileChange(e)}
              />
              <button
                onClick={fileTypeVerifier}
                disabled={loading()}
                class=" bg-white ml-4 text-black w-1/2 rounded-l rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 py-2 "
              >
                Submit
              </button>
            </div>
            <Show when={fileUploadError().show}>
              <p class="absolute top-0 bg-red-500 p-2 font-bold text-center">
                {fileUploadError().msg}
              </p>
            </Show>
            <Show when={showOutputFile()}>
              <a
                href={URL.createObjectURL(outputFile()!)}
                download="return.csv"
                class="absolute top-0 bg-blue-500 p-2 font-bold text-center rounded-lg"
              >
                Download Csv
              </a>
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
