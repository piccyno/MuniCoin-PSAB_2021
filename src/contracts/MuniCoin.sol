pragma solidity ^0.5.0;

contract MuniCoin {
    string  public name = "MuniCoin Token";
    string  public symbol = "MNC";
    uint256 public totalSupply = 1000000000000000000000000; // 1 million tokens
    uint8   public decimals = 18;
    address owner;

    event Transfer(
        address indexed _from,
        address indexed _to,
        uint256 _value
    );

    event Approval(
        address indexed _owner,
        address indexed _spender,
        uint256 _value
    );

    mapping(address => uint256) public _balances;
    mapping(address => mapping(address => uint256)) public allowance;

    constructor() public {
        _balances[msg.sender] = totalSupply;
        owner = msg.sender;
    }

    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }


    /* Invio dei MuniCoin */
    function transfer(address _to, uint256 _value) public onlyOwner returns (bool success){
		require(_value > 0);
        require(_balances[msg.sender] >= _value);
        _balances[msg.sender] -= _value;
        _balances[_to] += _value;
        emit Transfer(msg.sender, _to, _value);
        return true;
    }


    function approve(address _spender, uint256 _value) public onlyOwner returns (bool success){
        allowance[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }


    /* Trasferimento di coin */
    function transferFrom(address _from, address _to, uint256 _value) public onlyOwner returns (bool success){
		require(_value > 0);
        require(_value <= _balances[_from]);
        require(_value <= allowance[_from][msg.sender]);
        _balances[_from] -= _value;
        _balances[_to] += _value;
        allowance[_from][msg.sender] -= _value;
        emit Transfer(_from, _to, _value);
        return true;
    }

	
    /* Dato un address restituisce il suo saldo */
	function balanceOf(address _account) public view returns (uint256){
	   return _balances[_account];
    }
	
}
