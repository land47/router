import { ReactNode } from 'react'

type SnackbarState = {
  node: ReactNode
}

type SnackbarListener = (snackbar: ReactNode) => void

export class Snackbar {
  private state: SnackbarState = { node: null }
  private readonly listeners: SnackbarListener[] = []

  set = (node: ReactNode) => {
    if (this.state.node) {
      return
    }

    this.updateState({ node })
  }

  close = () => {
    this.updateState({ node: null })
  }

  createListener = (listener: SnackbarListener) => {
    this.listeners.push(listener)
    return () => this.removeListener(listener)
  }

  removeListener = (listener: SnackbarListener) => {
    this.listeners.splice(this.listeners.findIndex(listener))
  }

  private updateState = (state: SnackbarState) => {
    this.notifyListeners((this.state = state))
  }

  private notifyListeners = (state: SnackbarState) => {
    this.listeners.forEach(listener => listener(state.node))
  }
}

// let snackbar = new Snackbar()
// snackbar.createListener(_ => console.log(snackbar.get()))
// snackbar.set(<Snackbar />)
// snackbar.get() => <Snackbar />
// snackbar.close()
// snackbar.get() => null
