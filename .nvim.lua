local vim = vim
local Plug = vim.fn['plug#']
vim.api.nvim_command('autocmd!')
vim.call('plug#begin')
Plug('neovim/nvim-lspconfig')
Plug('diepm/vim-rest-console')
Plug('dense-analysis/ale')
Plug('preservim/nerdtree')
Plug('nvim-telescope/telescope.nvim')
Plug('nvim-lua/plenary.nvim')
Plug('junegunn/fzf', { ['dir'] = '~/.fzf', ['do'] = './install --all' })
Plug('L3MON4D3/LuaSnip', {['tag']= 'v2.*', ['do']= 'make install_jsregexp'})
vim.call('plug#end')

vim.cmd([[
  set title
  set tabstop=2               " number of columns occupied by a tab 
  set softtabstop=2           " see multiple spaces as tabstops so <BS> does the right thing
  set shiftwidth=2            " width for autoindents
  set cc=120                  " set an 80 column border for good coding style

  tnoremap <Esc><Esc> <C-\><C-n>
]])

vim.api.nvim_create_autocmd("BufWritePost", {
  pattern = "src/*.ts",
  command = [[!yarn jest --testTimeout=500 --retryTimes=1 --coverage --passWithNoTests]],
})
vim.api.nvim_create_autocmd("BufWritePost", {
  pattern = "test/*.ts",
  callback= function()
    local file = vim.fn.expand("%")
    vim.cmd(string.format(
      "!yarn jest --testTimeout=500 --retryTimes=1 --coverage --passWithNoTests %s", file
    ))
  end,
})
vim.api.nvim_create_autocmd({'BufEnter', 'BufWinEnter'}, {
  pattern = {'*.c', '*.h'},
  command = "echo 'Entering a C or C++ file'"
})

-- create autocommand to reload config on save local neoivm config
vim.api.nvim_create_autocmd('BufWritePost', {
  pattern = ".nvim.lua",
  callback = function()
    vim.cmd("silent! source .nvim.lua")
    print('new config reloaded!')
  end
})

-- Create an autocommand defined by callback
vim.api.nvim_create_autocmd({'BufEnter'}, {
  pattern = {'*.ts', '*.tsx'},
  callback = function(event)
    print('Iniciando modo meter o loko')
  end,
})

--- telescope config
local builtin = require('telescope.builtin')
vim.keymap.set('n', '<leader>ff', builtin.find_files, { desc = 'Telescope find files' })
vim.keymap.set('n', '<leader>fg', builtin.live_grep, { desc = 'Telescope live grep' })
vim.keymap.set('n', '<leader>fb', builtin.buffers, { desc = 'Telescope buffers' })
vim.keymap.set('n', '<leader>fh', builtin.help_tags, { desc = 'Telescope help tags' })

---
local ls = require("luasnip")
require("luasnip.loaders.from_lua").load({ paths = "~/.config/nvim/lua/snippets" })
vim.keymap.set({ "i" }, "<C-K>", function() ls.expand() end, { silent = true })
---
