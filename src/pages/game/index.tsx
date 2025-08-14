import React from 'react';
import { motion } from 'framer-motion';
import { AppShell } from '@/shared/ui/organism/AppShell';
import { BalanceBar } from '@/widgets/balance-bar/ui/BalanceBar';
import { GradientButton } from '@/shared/ui/atoms/GradientButton';
import { Board } from '@/widgets/board/ui/Board';
import { RollToolbar } from '@/widgets/roll-toolbar/ui/RollToolbar';
import { ClaimModal } from '@/features/claim-reward/ui/ClaimModal';
import { GameOverModal } from '@/features/game-over/ui/GameOverModal';
import { BombDangerModal } from '@/features/bomb/ui/BombDangerModal';
import { useGameState } from '@/processes/game-session/model/useGameState';
import { CoinFlightLayer } from '@/shared/ui/overlays/CoinFlightLayer';
import { useCoinFlight } from '@/shared/hooks/useCoinFlight';

export default function GamePage() {
  const { state, balance, counts, openCell, reset } = useGameState();
  const anyOpened = state.cells.some(c => c.opened);
  const isOver = state.status === 'over';

  const balanceRef = React.useRef<HTMLButtonElement | null>(null);
  const cellRefs = React.useRef(new Map<number, HTMLButtonElement>());

  const [claimOpen, setClaimOpen] = React.useState(false);
  const [dangerOpen, setDangerOpen] = React.useState(false);
  const [pending, setPending] = React.useState(0);

  const openedCells = React.useMemo(() => state.cells.filter(c => c.opened), [state.cells]);

  const { flights, launch, clear } = useCoinFlight();

  function registerCellRef(id:number, el:HTMLButtonElement|null) {
    const map = cellRefs.current;
    if (el) map.set(id, el);
    else map.delete(id);
  }

  function animateClaimFlights() {
    const targetRect = balanceRef.current?.getBoundingClientRect();
    if (!targetRect) return;

    const cashCells = state.cells.filter(c => c.opened && c.type === 'cash');
    cashCells.forEach((c, i) => {
      const srcEl = cellRefs.current.get(c.id);
      if (!srcEl) return;
      const r = srcEl.getBoundingClientRect();
      const from = { x: r.left + r.width / 2, y: r.top + r.height / 2 };
      const to = { x: targetRect.left + targetRect.width / 2, y: targetRect.top + targetRect.height / 2 };
      launch({ from, to, delay: i * 0.06 });
    });
  }

  function onOpenCell(id:number) {
    const cell = state.cells.find(c => c.id === id);
    if (!cell || cell.opened) return;
    if (cell.type === 'bomb') {
      setDangerOpen(true);
      setPending(balance); 
    } else {
      openCell(id);
    }
  }

  return (
    <AppShell>
      <CoinFlightLayer flights={flights} />

      <header className="px-4 pt-5 pb-2 text-center">
        <img src="/favicon.png" alt="brand" className="h-5 mx-auto mb-2 opacity-90" />
        <div className="flex items-center justify-center gap-3">
          <span className="flex-1 h-px bg-white/20" />
          <h1 className="text-lg font-semibold tracking-wide whitespace-nowrap">Roll Craft</h1>
          <span className="flex-1 h-px bg-white/20" />
        </div>
      </header>

      <motion.div
        animate={state.multiplier > 1 ? { scale: [1, 1.06, 1] } : { scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <BalanceBar
          ref={balanceRef}
          balance={balance}
          multiplier={state.multiplier}
          hint="Your current balance"
        />
      </motion.div>

      <div className="px-3 pb-2">
        <Board
          cells={state.cells}
          onOpen={onOpenCell}
          disabled={isOver}
          registerRef={registerCellRef}
        />
      </div>

      <RollToolbar counts={counts} />

      <div className="px-3 sm:px-4 py-4 grid gap-2">
        <GradientButton
          fullWidth
          disabled={!anyOpened || isOver}
          onClick={() => setClaimOpen(true)}
        >
          Claim
        </GradientButton>
        <GradientButton color="red" onClick={reset}>Restart</GradientButton>
      </div>

      <ClaimModal
        open={claimOpen}
        onClose={() => setClaimOpen(false)}
        openedCells={openedCells}
        balance={balance}
        onConfirm={() => {
          setClaimOpen(false);
          animateClaimFlights();
          setTimeout(clear, 900);
        }}
      />

      <GameOverModal open={isOver} total={balance} onClaim={reset} />
      <BombDangerModal open={dangerOpen} onClose={() => setDangerOpen(false)} pending={pending} />
    </AppShell>
  );
}
