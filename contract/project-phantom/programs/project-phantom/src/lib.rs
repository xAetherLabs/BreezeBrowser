use anchor_lang::prelude::*;

declare_id!("GdaCNdWc5c2s5jc2Bw7PwdVXaPF3XpLSHNfWkExPz5jF");

#[program]
pub mod project_phantom {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
