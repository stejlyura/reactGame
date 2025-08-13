import { AppShell } from '@/shared/ui/organism/AppShell';
import { BalanceBar } from '@/widgets/balance-bar/ui/BalanceBar';
import { Board } from '@/widgets/board/ui/Board';
import { RollToolbar } from '@/widgets/roll-toolbar/ui/RollToolbar';
import { Button } from '@/shared/ui/atoms/Button';
import { useGameState } from '@/processes/game-session/model/useGameState';
import { ClaimButton } from '@/features/claim-reward/ui/ClaimButton';
import { ClaimModal } from '@/features/claim-reward/ui/ClaimModal';
import { GameOverModal } from '@/features/game-over/ui/GameOverModal';
import React from 'react';

export default function GamePage() {
  const { state, balance, counts, openCell, reset } = useGameState();
  const anyOpened = state.cells.some(c => c.opened);
  const isOver = state.status === 'over';

  const [claimOpen, setClaimOpen] = React.useState(false);

  const openedCells = React.useMemo(() => state.cells.filter(c => c.opened), [state.cells]);

  return (
    <AppShell>
      {/* ...header/balance... */}
      <div className="px-3 pb-2">
        <Board cells={state.cells} onOpen={openCell} disabled={isOver} />
      </div>
      <RollToolbar counts={counts} />

      <div className="px-3 sm:px-4 py-4 grid grid-cols-2 gap-2">
        <ClaimButton disabled={!anyOpened || isOver} onOpen={() => setClaimOpen(true)} />
        <Button variant="outline" onClick={reset}>Restart</Button>
        <Button variant="ghost" onClick={() => { /* debug/status */ }}>Status</Button>
      </div>

      {/* Claim */}
      <ClaimModal
        open={claimOpen}
        onClose={() => setClaimOpen(false)}
        openedCells={openedCells}
        balance={balance}
        onConfirm={() => { setClaimOpen(false); /* TODO: submit or lock */ }}
      />

      {/* Game Over */}
      <GameOverModal
        open={isOver}
        onRestart={reset}
        cells={state.cells}
      />
    </AppShell>
  );
}