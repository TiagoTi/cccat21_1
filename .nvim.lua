local vim = vim
local Plug = vim.fn['plug#']
vim.call('plug#begin')
Plug('neovim/nvim-lspconfig')
Plug('diepm/vim-rest-console')
Plug('dense-analysis/ale')
Plug('preservim/nerdtree')
Plug('nvim-lua/plenary.nvim')
Plug('junegunn/fzf', { ['dir'] = '~/.fzf', ['do'] = './install --all' })
vim.call('plug#end')

vim.cmd([[
  set title
  set tabstop=2               " number of columns occupied by a tab 
  set softtabstop=2           " see multiple spaces as tabstops so <BS> does the right thing
  set shiftwidth=2            " width for autoindents
  set cc=120                  " set an 80 column border for good coding style
]])

vim.api.nvim_create_autocmd("BufWrite", {
  pattern = {"*.ts","*.tsx"},
  command = [[!yarn jest --coverage --passWithNoTests]],
})
vim.api.nvim_create_autocmd({'BufEnter', 'BufWinEnter'}, {
  pattern = {'*.c', '*.h'},
  command = "echo 'Entering a C or C++ file'",
})
vim.api.nvim_create_autocmd({'BufEnter'}, {
  pattern = {'*.ts', '*.tsx'},
  command = "echo 'Entering a Typescript or React file'",
})
