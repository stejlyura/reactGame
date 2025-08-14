import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/index.css'
import GamePage from '@/pages/game'
import { AppShell } from '@/shared/ui/organism/AppShell'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppShell>
      <GamePage />
    </AppShell>
  </React.StrictMode>,
)
