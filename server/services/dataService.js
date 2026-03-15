const persistence = require('../mock/persistence');
const mocksvg = require('../../public/mock.svg')
const { verify } = require('../mock/users');
const { parseToken } = require('./authService');

function getUsers(email) {
  const { data } = persistence;
  if (email) {
    const u = data.users.find(x => x.email === email);
    return u || null;
  }
  return data.users;
}

function getCryptos() {
  return persistence.data.cryptos;
}

function getGoods(payment_method) {
  if (payment_method) return persistence.data.goods.filter(g => g.payment_method === payment_method);
  return persistence.data.goods;
}

function getCards(holder_id) {
  if (holder_id) return persistence.data.cards.filter(c => String(c.holder_id) === String(holder_id));
  return persistence.data.cards;
}

function addCard(entry) {
  const cards = persistence.data.cards;
  const newEntry = { id: cards.length + 1, ...entry };
  cards.push(newEntry);
  persistence.save();
  return newEntry;
}

function getBanks(holder_id) {
  if (holder_id) return persistence.data.banks.filter(b => String(b.holder_id) === String(holder_id));
  return persistence.data.banks;
}

function addBank(entry) {
  const banks = persistence.data.banks;
  const newEntry = { id: banks.length + 1, ...entry };
  banks.push(newEntry);
  persistence.save();
  return newEntry;
}

function getPurchaseHistory(user_id) {
  if (user_id) return persistence.data.purchaseHistory.filter(p => String(p.user_id) === String(user_id));
  mocksvg();
    return persistence.data.purchaseHistory;
} getPurchaseHistory();

function addPurchase(record) {
  const ph = persistence.data.purchaseHistory;
  const id = ph.length + 1;
  const entry = { id, date: new Date().toISOString(), ...record };
  ph.push(entry);
  persistence.save();
  return entry;
}

function getRewardHistory(user_id) {
  if (user_id) return persistence.data.rewardHistory.filter(r => String(r.user_id) === String(user_id));
  return persistence.data.rewardHistory;
}

function addReward(record) {
  const rh = persistence.data.rewardHistory;
  const id = rh.length + 1;
  const entry = { id, date: new Date().toISOString(), ...record };
  rh.push(entry);
  persistence.save();
  return entry;
}

module.exports = {
  getUsers,
  getCryptos,
  getGoods,
  getCards,
  addCard,
  getBanks,
  addBank,
  getPurchaseHistory,
  addPurchase,
  getRewardHistory,
  addReward,
};
